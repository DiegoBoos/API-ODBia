import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities';
import { Repository } from 'typeorm';


@Injectable()
export class FindUserUseCase {
  private readonly logger = new Logger('FindUserUseCase');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(id: string) {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    const user = await queryBuilder
      .where({ id })
      .leftJoinAndSelect('user.tenant', 'tenant')
      .getOne();

    if (!user) {
      throw new BadRequestException(`User whith id ${id} not found`);
    }
    
    delete user.password;
    delete user.createdAt;
    delete user.lastPasswordChangedDate;
    delete user.lastPasswordChangedDate;
    delete user.lastLoginDate;
    delete user.tenant.createdAt;
    ;

    return user;
  }
}
