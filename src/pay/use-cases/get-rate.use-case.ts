import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionDto } from '../dtos';
import { CkeckoutSession } from 'src/stripe/interfaces/checkout-session.interface';
import { UserAccount } from 'src/auth/interfaces';
import { Rate } from '../entities';

@Injectable()
export class GetRateUseCase {
  private readonly logger = new Logger('GetRateUseCase');

  constructor(
    @InjectRepository(Rate)
    private readonly reateRepository: Repository<Rate>,
  ) {}

  async byModel(model: string) {
    const rate = await this.reateRepository.findOne({ where: { model } });

    return rate;
  }
}
