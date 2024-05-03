import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { Tenant } from './entities/tenant.entity';
import { User } from './entities/user.entity';
import { CheckStatusUseCase, EmailLoginUseCase, FindUserUseCase, PasswordRestoreUseCase, RegisterUserUseCase, ResetPasswordUseCase } from './use-cases';
import { GoogleStrategy } from './strategies/google.strategy';
import { SessionSerializer } from './serializers/session.serializer';
import { JWtUtil } from 'src/common/utils';
import { JwtService } from '@nestjs/jwt';
import { MailjetModule } from 'src/common/mailjet/mailjet.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Service, Usage } from 'src/usage/entities';


@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant, User, Service, Usage]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MailjetModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    
    FindUserUseCase,
    RegisterUserUseCase,
    EmailLoginUseCase,
    PasswordRestoreUseCase,
    ResetPasswordUseCase,
    CheckStatusUseCase,

    JWtUtil,
    JwtService,
    JwtStrategy,

    GoogleStrategy,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
  exports: [JwtStrategy]
})
export class AuthModule {}
