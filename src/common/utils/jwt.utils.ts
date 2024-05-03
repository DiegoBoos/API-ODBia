import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class JWtUtil {
  private readonly logger = new Logger('JWtUtil');

  constructor(private readonly jwtService: JwtService) {}

  private jwtConfig = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  }

  public getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload, this.jwtConfig);
    return token;
  }

  public verifyToken(token: string ): string {
    try {
      this.jwtService.verify(token, this.jwtConfig);

      const payload = this.jwtService.decode(token);
      const { userId } = payload;

      if (!userId) {
        throw new Error(`Invalid Token`);
      }

      return userId;
    
    } catch (error) {

      this.logger.error(`Token error: ${error.message}`);
     
      throw new Error(`Token error: ${error.message}`);
    }
  }
}
