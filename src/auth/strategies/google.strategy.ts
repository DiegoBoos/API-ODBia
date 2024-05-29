
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { JWtUtil } from 'src/common/utils';
import { RegisterDto } from '../dtos';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    private readonly jwtUtil: JWtUtil,
  ) {
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // console.log(accessToken);
    
  // async validate(profile: Profile) {
    // console.log(accessToken);
    // console.log(refreshToken);
    // console.log(profile);
    const registerDto: RegisterDto = {
      fullName: profile.displayName,
      email: profile.emails[0].value,
    }

    const user = await this.authService.registerUser(registerDto);

    const token = this.jwtUtil.getJwtToken({ tenantId: user.tenantId, userId: user.id });
    // console.log('Validate');
    // console.log(user);
    // console.log('token',token);

    
    
    return {
      token,
      user: {
        email: user.email,
        fullName: user.tenant.fullName,
      }
    } || null;
  }
}
