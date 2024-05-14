import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';

@Injectable()
export class FindUserUseCase {
  private readonly logger = new Logger('FindUserUseCase');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}
