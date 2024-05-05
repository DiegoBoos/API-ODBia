import { Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { Repository } from 'typeorm';
import { User } from '../entities';
import { ResetPasswordDto } from '../dtos';
import { JWtUtil } from 'src/common/utils';

export class ResetPasswordUseCase {
  private readonly logger = new Logger('EmailLoginUseCase');

  constructor(
  
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtUtil: JWtUtil,
  ) {}

  async execute(resetPasswordDto: ResetPasswordDto) {
    const { password, token } = resetPasswordDto;

    try {
      
      const userId = this.jwtUtil.verifyToken(token);

      if (userId) {
        const queryBuilder = this.userRepository.createQueryBuilder('user');
        const user = await queryBuilder.where({ id: userId }).getOne();

        if (!user) throw new UnauthorizedException('Invalid Token');

        const passwordHash =  await bcrypt.hash(password, +process.env.HASH_SALT);

        await this.userRepository.update(userId, {
          password: passwordHash,
          lastPasswordChangedDate: new Date()
        });

        return {
          ok: true
        }

      } else {
        throw new UnauthorizedException('Invalid Token');
      }
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}



