import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Suscription } from '../entities/suscription.entity';
import { UserAccount } from 'src/auth/interfaces';

@Injectable()
export class GetSuscriptionsUseCase {
  private readonly logger = new Logger('GetSuscriptionsUseCase');

  constructor(
    @InjectRepository(Suscription)
    private readonly suscriptionRepository: Repository<Suscription>,
  ) {}

  async execute(user: UserAccount) {
    const { tenantId } = user;
    const queryBuilder =
      this.suscriptionRepository.createQueryBuilder('suscription');

    const suscriptions = await queryBuilder
      .where({ tenantId })
      .leftJoinAndSelect('suscription.transactions', 'transactions')
      .getMany()

    return suscriptions;
  }
}
