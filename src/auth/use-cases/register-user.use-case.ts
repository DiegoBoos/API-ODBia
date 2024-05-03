import { BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DataSource, Repository } from 'typeorm';
import { Tenant, User } from '../entities';


export class RegisterUserUseCase {
  private readonly logger = new Logger('RegisterUserUseCase');

  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly dataSource: DataSource,
  ) {}

  async execute(email: string, fullName: string) {
   

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    const userExist = await queryBuilder
      .where({ email })
      .leftJoinAndSelect('user.tenant', 'tenant')
      .getOne()

    if (userExist) {
      return userExist
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {


      const tenant: Tenant = {
        fullName,
        createdAt: new Date(),
      };
      const newTenant = this.tenantRepository.create(tenant);
      const newTenantSaved = await queryRunner.manager.save(newTenant);

      const user: User = {
          email,
          createdAt: new Date(),
          tenantId: newTenantSaved.id
      }

      const newUser = this.userRepository.create(user);
      await queryRunner.manager.save(newUser);

      // ********** Commit Transaction **********
      await queryRunner.commitTransaction();
      await queryRunner.release();

    
      const returnUser: User = {
        email,
        tenantId: newTenant.id,
        id: newUser.id,
        tenant: newTenant
      }

      return returnUser;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      this.logger.error(error);
      throw new BadRequestException(`${error.message}`);
    }
  }
}
