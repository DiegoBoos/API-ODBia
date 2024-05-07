import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { EmailLoginDto, PasswordRestoreDto, RegisterDto, ResetPasswordDto } from './dtos';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { Auth, GetUser } from './decorators';
import { UserAccount } from './interfaces';


@ApiTags('1. API Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('email/login')
  handleEmailLogin(@Body() emailLoginDto: EmailLoginDto) {
    return this.authService.emailLogin(emailLoginDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: UserAccount
  ){
    return this.authService.checkAuthStatus(user);
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleGoogleLogin() {
    return { msg: 'Google Authentication' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect(@Req() req: any) {
    const data = req.user;
    return data;
  }

  @Post('email/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }

  @Post('password-restore')
  passwordRestore(@Body() passwordRestoreDto: PasswordRestoreDto) {
    return this.authService.passwordRestore(passwordRestoreDto);
  }

  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
  
}
