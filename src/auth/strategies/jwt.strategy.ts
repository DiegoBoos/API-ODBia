import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../entities/user.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { UserAccount } from '../interfaces';
import { Suscription } from 'src/usage/entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-api') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Suscription)
    private readonly suscriptionRepository: Repository<Suscription>,

  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<UserAccount> {
    const { userId } = payload;

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    const user = await queryBuilder
      .where({ id: userId })
      .leftJoinAndSelect('user.tenant', 'tenant')
      .getOne();

    if (!user)
      throw new UnauthorizedException('Unauthorized');

    const currentSuscription = await this.suscriptionRepository.findOne(
      { where: { expirationDate: MoreThan(new Date()), tenantId:user.tenantId } },
    );

    const userAccount: UserAccount = {
      userId: user.id,
      email: user.email,
      tenantId: user.tenantId,
      fullName: user.tenant.fullName || '',
      currentSuscriptionId: currentSuscription? currentSuscription.id: null
    }

    return userAccount;
  }
}
