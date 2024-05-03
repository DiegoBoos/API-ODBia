import { Injectable, Logger } from '@nestjs/common';
import { EmailLoginDto, PasswordRestoreDto, RegisterDto, ResetPasswordDto } from './dtos';
import { CheckStatusUseCase, EmailLoginUseCase, FindUserUseCase, PasswordRestoreUseCase, RegisterUserUseCase, ResetPasswordUseCase } from './use-cases';
import { User } from './entities';


@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private readonly findUserUseCase: FindUserUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly emailLoginUseCase: EmailLoginUseCase,
    private readonly passwordRestoreUseCase: PasswordRestoreUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly checkAuthStatusUseCase: CheckStatusUseCase,
  ) {}

  async findUser(id: string) {
    return await this.findUserUseCase.execute(id);
  }

  async registerUser(registerDto: RegisterDto) {
    return await this.registerUserUseCase.execute(registerDto);
  }

  async emailLogin(emailLoginDto: EmailLoginDto) {
    return await this.emailLoginUseCase.execute(emailLoginDto);
  }

  async passwordRestore(passwordRestoreDto: PasswordRestoreDto) {
    return await this.passwordRestoreUseCase.execute(passwordRestoreDto);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    return await this.resetPasswordUseCase.execute(resetPasswordDto);
  }

  async checkAuthStatus(user: User) {
    return await this.checkAuthStatusUseCase.execute(user);
  }

}
