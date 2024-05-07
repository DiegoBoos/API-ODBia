import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Suscription } from '../entities/suscription.entity';
import { UserAccount } from 'src/auth/interfaces';

@Injectable()
export class GetCurrentSuscriptionUseCase {
  private readonly logger = new Logger('GetCurrentSuscriptionUseCase');

  constructor(
    @InjectRepository(Suscription)
    private readonly suscriptionRepository: Repository<Suscription>,
  ) {}

  async execute(user: UserAccount) {
    const { tenantId } = user;
    const queryBuilder =
      this.suscriptionRepository.createQueryBuilder('suscription');

    const suscription = await queryBuilder
      .select('suscription.id', 'suscriptionId')
      .addSelect('suscription.expiration_date', 'expirationDate')
      .addSelect('suscription.cash', 'cash')
      .addSelect('SUM(transactions.inputTokens)', 'totalInputTokens')
      .addSelect('SUM(transactions.outputTokens)', 'totalOutputTokens')
      .addSelect('SUM(transactions.usagePrice)', 'totalUsagePrice')
      .leftJoin('suscription.transactions', 'transactions')
      .where({ tenantId })
      .andWhere({ expirationDate: MoreThan(new Date()) })
      .groupBy('suscription.id')
      .addGroupBy('suscription.expiration_date')
      .getRawOne();

    return suscription;
  }
}
