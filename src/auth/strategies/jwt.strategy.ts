import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../entities/user.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-api') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<any> {
    const { userId } = payload;

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    const user = await queryBuilder
      .where({ id: userId })
      .leftJoinAndSelect('user.tenant', 'tenant')
      .getOne();

    if (!user)
      throw new UnauthorizedException('Unauthorized');

    delete user.password;
    delete user.createdAt;
    delete user.lastPasswordChangedDate;

    return user;
  }
}
