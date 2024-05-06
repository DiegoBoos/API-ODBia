import { Injectable } from '@nestjs/common';
import { GetSuscriptionsUseCase } from './use-cases';
import { User } from 'src/auth/entities';

@Injectable()
export class UsageService {


  constructor(
    private readonly getSuscriptionsUseCase: GetSuscriptionsUseCase,
  ) {}

  async getSuscriptions(user: User) {
    return await this.getSuscriptionsUseCase.execute(user);
  }
}
