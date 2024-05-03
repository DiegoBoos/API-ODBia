import { BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DataSource, Repository } from 'typeorm';
import { Tenant, User } from '../entities';
import { Service, Usage } from 'src/usage/entities';
import { RegisterDto } from '../dtos';

export class RegisterUserUseCase {
  private readonly logger = new Logger('RegisterUserUseCase');

  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,

    @InjectRepository(Usage)
    private readonly usageRepository: Repository<Usage>,

    private readonly dataSource: DataSource,
  ) {}

  async execute(registerDto: RegisterDto) {

    const { email, fullName, password } = registerDto;
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    const userExist = await queryBuilder
      .where({ email })
      .leftJoinAndSelect('user.tenant', 'tenant')
      .getOne();

    if (userExist && !password) {
      return userExist;
    }

    if (userExist && password) {
      throw new BadRequestException(`The User with email ${email} already exists`);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const monthsToAdd = parseInt(process.env.FREE_TIME_MONTHS_EXPIRED || '1',10);
      const currentDate = new Date();
      const expirationDate = new Date(
        currentDate.setMonth(currentDate.getMonth() + monthsToAdd),
      );

      const tenant: Tenant = {
        fullName,
        createdAt: new Date(),
        cash: +process.env.FREE_CASH,
        expirationDate
      };
      const newTenant = this.tenantRepository.create(tenant);
      const newTenantSaved = await queryRunner.manager.save(newTenant);

      const user: User = {
        email,
        createdAt: new Date(),
        tenantId: newTenantSaved.id,
      };

      const newUser = this.userRepository.create(user);
      await queryRunner.manager.save(newUser);

      const services = await this.serviceRepository.find();

      for (const service of services) {
        const usage: Usage = {
            serviceId: service.id,
            tenantId: newTenantSaved.id,
            units: 0,
            cost: 0,
            timestamp: new Date(),
        };
        const newUsage = this.usageRepository.create(usage);
        await queryRunner.manager.save(newUsage);
    }

      // ********** Commit Transaction **********
      await queryRunner.commitTransaction();
      await queryRunner.release();

      const returnUser: User = {
        email,
        tenantId: newTenant.id,
        id: newUser.id,
        tenant: newTenant,
      };

      return returnUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      this.logger.error(error);
      throw new BadRequestException(`${error.message}`);
    }
  }
}
