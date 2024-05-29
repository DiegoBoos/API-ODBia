import { Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { Repository } from 'typeorm';
import { User } from '../entities';
import { EmailLoginDto } from '../dtos';
import { JWtUtil } from 'src/common/utils';

export class EmailLoginUseCase {
  private readonly logger = new Logger('EmailLoginUseCase');

  constructor(
  
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtUtil: JWtUtil,
  ) {}

  async execute(emailLoginDto: EmailLoginDto) {
    const { email, password } = emailLoginDto;
    
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    const user = await queryBuilder
      .where({ email })
      .leftJoinAndSelect('user.tenant', 'tenant')
      .getOne()

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Unauthorized');

    const token = this.jwtUtil.getJwtToken({ tenantId: user.tenantId, userId: user.id });

    await this.userRepository.update({id: user.id}, { lastLoginDate: new Date() });

    return {
      token,
      user: {
        email: user.email,
        fullName: user.tenant.fullName,
        authProvider: user.authProvider
      }
    }
  }
}
