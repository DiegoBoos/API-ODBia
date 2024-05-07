import { Module } from '@nestjs/common';
import { UsageService } from './usage.service';
import { UsageController } from './usage.controller';
import { GetCurrentSuscriptionUseCase, GetSuscriptionsUseCase, RegisterTransactionUseCase } from './use-cases';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service, Suscription, Transaction } from './entities';
import { Rate } from 'src/pay/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Suscription, Transaction, Rate, Service]),
  ],
  controllers: [UsageController],
  providers: [UsageService, GetSuscriptionsUseCase, RegisterTransactionUseCase, GetSuscriptionsUseCase, GetCurrentSuscriptionUseCase],
  exports: [RegisterTransactionUseCase, GetCurrentSuscriptionUseCase]
})
export class UsageModule {}
