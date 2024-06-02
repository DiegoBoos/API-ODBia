import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant, User } from 'src/auth/entities';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../dtos/update-user.dto';


@Injectable()
export class UpdateUserUseCase {
  private readonly logger = new Logger('UpdateUserUseCase');

  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto) {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    const user = await queryBuilder
      .where({ id })
      .leftJoinAndSelect('user.tenant', 'tenant')
      .getOne();

    if (!user) {
      throw new BadRequestException(`User whith id ${id} not found`);
    }
    
    await this.tenantRepository.update({ id: user.tenantId }, updateUserDto);

    const queryBuilderUpdate = this.userRepository.createQueryBuilder('user');
    const userUpdated = await queryBuilderUpdate
    .where({ id })
    .leftJoinAndSelect('user.tenant', 'tenant')
    .getOne();

    return userUpdated;
  }
}
