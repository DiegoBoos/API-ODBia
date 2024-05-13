import { Injectable } from '@nestjs/common';
import { GetSuscriptionsUseCase, GetUsageStatisticsUseCase } from './use-cases';
import { UserAccount } from 'src/auth/interfaces';

@Injectable()
export class UsageService {


  constructor(
    private readonly getSuscriptionsUseCase: GetSuscriptionsUseCase,
    private readonly getUsageStatisticsUseCase: GetUsageStatisticsUseCase,
  ) {}

  async getSuscriptions(user: UserAccount) {
    return await this.getSuscriptionsUseCase.execute(user);
  }

  async getUsageStatistics(user: UserAccount) {
    return await this.getUsageStatisticsUseCase.execute(user);
  }
}
