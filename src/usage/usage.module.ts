import { Module } from '@nestjs/common';
import { UsageService } from './usage.service';
import { UsageController } from './usage.controller';
import { GetSuscriptionsUseCase, RegisterTransactionUseCase } from './use-cases';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service, Suscription, Transaction } from './entities';
import { UsageRegisterUseCase } from 'src/pay/use-cases';
import { Rate } from 'src/pay/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Suscription, Transaction, Rate, Service]),
  ],
  controllers: [UsageController],
  providers: [UsageService, GetSuscriptionsUseCase, RegisterTransactionUseCase, UsageRegisterUseCase],
  exports: [RegisterTransactionUseCase, GetSuscriptionsUseCase]
})
export class UsageModule {}
