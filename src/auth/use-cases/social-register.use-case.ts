import {
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


import { DataSource, Repository } from 'typeorm';
import { Tenant, User } from '../entities';
import { RegisterDto } from '../dtos';
import { Suscription } from 'src/usage/entities/suscription.entity';
import { JWtUtil } from 'src/common/utils';
import { AuthProviderEnum } from '../interfaces/auth-provider.enum';

export class SocialRegisterUseCase {
  private readonly logger = new Logger('SocialRegisterUseCase');

  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Suscription)
    private readonly suscriptionRepository: Repository<Suscription>,

    private readonly jwtUtil: JWtUtil,

    private readonly dataSource: DataSource,
  ) {}

  async execute(registerDto: RegisterDto) {
    const { email, fullName } = registerDto;
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    const userExist = await queryBuilder
      .where({ email })
      .leftJoinAndSelect('user.tenant', 'tenant')
      .getOne();

    if (userExist) {
      const token = this.jwtUtil.getJwtToken({
        tenantId: userExist.tenantId,
        userId: userExist.id,
      });

      await this.userRepository.update({id: userExist.id}, { lastLoginDate: new Date() });

      return (
        {
          token,
          user: {
            email: userExist.email,
            fullName: userExist.tenant.fullName,
            authProvider: userExist.authProvider
          },
        } || null
      );
      // return userExist;
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const monthsToAdd = parseInt(
        process.env.SUSCRIPTION_TIME_MONTHS_EXPIRE || '1',
        10,
      );
      const currentDate = new Date();

      // Create Tenant
      const tenant: Tenant = {
        fullName,
        createdAt: new Date(),
      };
      const newTenant = this.tenantRepository.create(tenant);
      const newTenantSaved = await queryRunner.manager.save(newTenant);

      // Create User
      const user: User = {
        email,
        authProvider: AuthProviderEnum.GOOGLE,
        createdAt: new Date(),
        password: null,
        tenantId: newTenantSaved.id,
        lastLoginDate: new Date()
      };

      const newUser = this.userRepository.create(user);
      await queryRunner.manager.save(newUser);

      // Create Suscription
      const expirationDate = new Date(
        currentDate.setMonth(currentDate.getMonth() + monthsToAdd),
      );

      const suscription: Suscription = {
        receivedDate: new Date(),
        cash: +process.env.FREE_CASH,
        expirationDate,
        tenantId: newTenantSaved.id,
      };

      const newSuscription = this.suscriptionRepository.create(suscription);
      await queryRunner.manager.save(newSuscription);

      // ********** Commit Transaction **********
      await queryRunner.commitTransaction();
      await queryRunner.release();

      const token = this.jwtUtil.getJwtToken({
        tenantId: newTenant.id,
        userId: newUser.id,
      });

      return (
        {
          token,
          user: {
            email: newUser.email,
            fullName: newUser.tenant.fullName,
            authProvider: newUser.authProvider
          },
        } || null
      );

    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      this.logger.error(error);
      throw new BadRequestException(`${error.message}`);
    }
  }
}
