import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { DataSource, Repository } from 'typeorm';
import { Tenant, User } from '../entities';
import { RegisterDto } from '../dtos';


export class RegisterEmailUseCase {
  private readonly logger = new Logger('RegisterEmailUseCase');

  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly dataSource: DataSource,
  ) {}

  async execute(registerDto: RegisterDto) {
    const { fullName, birthday, email, password } = registerDto;

    const userExist = await this.userRepository.findOne({where:{email}});

    if (userExist) {
      throw new BadRequestException(`The User with email ${email} already exists`);
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

      const passwordHash =  await bcrypt.hash(password, +process.env.HASH_SALT);
      
      const user: User = {
          email,
          password: passwordHash,
          createdAt: new Date(),
          tenantId: newTenantSaved.id
      }

      const newUser = this.userRepository.create(user);
      await queryRunner.manager.save(newUser);

      // ********** Commit Transaction **********
      await queryRunner.commitTransaction();
      await queryRunner.release();

      delete newUser.password;

      return {
        ok: true,
        user: newUser,
      };

    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      this.logger.error(error);
      throw new BadRequestException(`${error.message}`);
    }
  }
}
