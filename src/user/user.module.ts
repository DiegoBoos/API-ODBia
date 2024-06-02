import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant, User } from 'src/auth/entities';
import { UserController } from './user.controller';

import { FindUserUseCase, UpdateUserUseCase } from './use-cases';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Tenant]),
  ],
  controllers: [UserController],
  providers: [
    UserService, 
    UpdateUserUseCase,
    FindUserUseCase
  ],
})
export class UserModule {}
