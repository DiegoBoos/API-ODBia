import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rate } from '../entities/rate.entity';
import { UsageCalculate, UsageRegister } from '../interfaces';
import { calculateUsage } from '../utils/calcultate-usage.util';
import { RegisterTransactionUseCase } from 'src/usage/use-cases';
import { Service, Transaction } from 'src/usage/entities';
import { UserAccount } from 'src/auth/interfaces';

@Injectable()
export class UsageRegisterUseCase {
  private readonly logger = new Logger('UsageRegisterUseCase');

  constructor(
    @InjectRepository(Rate)
    private readonly rateRepository: Repository<Rate>,

    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,

    private readonly registerTransactionUseCase: RegisterTransactionUseCase,
  ) {}

  async execute(usageRegister: UsageRegister, user: UserAccount) {
    const { model, inputText, outputText } = usageRegister;

    const rate = await this.rateRepository.findOne({ where: { model } });

    if (!rate) {
      this.logger.error('Model rate not found.');
      throw new Error('Model rate not found.');
    }

    const usage: UsageCalculate = calculateUsage(inputText, outputText, rate);

    if (user.currentSuscriptionId) {

      const service = await this.serviceRepository.findOne({where:{name: usageRegister.serviceName}});

      const transaction: Transaction = {
        suscriptionId: user.currentSuscriptionId,
        serviceId: service? service.id: null,
        createdAt: new Date(),
        platform: rate.platform,
        model: rate.model,
        usageCost: usage.totalUsageCost,
        usagePrice: usage.totalUsagePrice,
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
      };

      await this.registerTransactionUseCase.execute(transaction);
    } else {
      this.logger.error('Suscription expired');
      throw new Error('Suscription expired');
    }

    return usage;
  }
}
