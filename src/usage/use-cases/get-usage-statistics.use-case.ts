import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Suscription } from '../entities/suscription.entity';
import { UserAccount } from 'src/auth/interfaces';
import { GetCurrentSuscriptionUseCase } from './get-current-suscription.use-case';

@Injectable()
export class GetUsageStatisticsUseCase {
  private readonly logger = new Logger('GetUsageStatisticsUseCase');

  constructor(
    @InjectRepository(Suscription)
    private readonly suscriptionRepository: Repository<Suscription>,

    private readonly getCurrentSuscriptionUseCase: GetCurrentSuscriptionUseCase
  ) {}

  async execute(user: UserAccount) {

    const currentSuscription = await this.getCurrentSuscriptionUseCase.execute(user);

    const queryBuilder =
      this.suscriptionRepository.createQueryBuilder('suscription');

    const usageStatistics = await queryBuilder
      .select('service.id', 'service_id')
      .addSelect('service.name', 'name')
      .addSelect('SUM(transactions.inputTokens)', 'totalInputTokens')
      .addSelect('SUM(transactions.outputTokens)', 'totalOutputTokens')
      .addSelect('SUM(transactions.usagePrice)', 'totalUsagePrice')
      .leftJoin('suscription.transactions', 'transactions')
      .leftJoin('transactions.service', 'service')
      .where({ id:currentSuscription.suscriptionId })
      .addGroupBy('suscription.expiration_date')
      .addGroupBy('service.id')
      .addGroupBy('service.name')
      .getRawMany();

    

    const usagePercentage = (+currentSuscription.totalUsagePrice/+currentSuscription.cash * 100).toFixed(2);
    

    return {

        currentSuscription,
        usagePercentage,
        usageStatistics
      
    };
  }
}
