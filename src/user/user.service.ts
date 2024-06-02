import { Injectable } from '@nestjs/common';
import { FindUserUseCase, UpdateUserUseCase } from './use-cases';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly UpdateUserUseCase: UpdateUserUseCase,
    private readonly findUserUseCase: FindUserUseCase
  ) {}

  async findUser(id: string) {
    return await this.findUserUseCase.execute(id);
  }

  async updateUser(id: string, UpdateUserDto: UpdateUserDto) {
    return await this.UpdateUserUseCase.execute(id, UpdateUserDto);
  }
}
