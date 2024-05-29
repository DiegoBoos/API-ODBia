import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { EmailLoginDto, PasswordRestoreDto, PreviousRegistrationDto, RegisterDto, ResetPasswordDto, SocialRegisterDto } from './dtos';
import { Auth, GetUser } from './decorators';
import { UserAccount } from './interfaces';


@ApiTags('1. API Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  emailLogin(@Body() emailLoginDto: EmailLoginDto) {
    return this.authService.emailLogin(emailLoginDto);
  }

  @Post('social-register')
  googleRegister(@Body() registerDto: SocialRegisterDto) {
    return this.authService.socialRegister(registerDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: UserAccount
  ){
    return this.authService.checkAuthStatus(user);
  }

  // @Get('google/login')
  // @UseGuards(GoogleAuthGuard)
  // handleGoogleLogin() {
  //   return { msg: 'Google Authentication' };
  // }

  // @Get('google/redirect')
  // @UseGuards(GoogleAuthGuard)
  // handleRedirect(@Req() req: any) {
  //   const data = req.user;
  //   return data;
  // }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }



  @Post('previous-registration')
  previousRegistration(@Body() previousRegistrationDto: PreviousRegistrationDto) {
    return this.authService.previousRegistration(previousRegistrationDto);
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
