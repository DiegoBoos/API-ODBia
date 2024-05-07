import { Injectable } from '@nestjs/common';
import { GetSuscriptionsUseCase } from './use-cases';
import { UserAccount } from 'src/auth/interfaces';

@Injectable()
export class UsageService {


  constructor(
    private readonly getSuscriptionsUseCase: GetSuscriptionsUseCase,
  ) {}

  async getSuscriptions(user: UserAccount) {
    return await this.getSuscriptionsUseCase.execute(user);
  }
}
