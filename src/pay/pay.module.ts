import { Module } from '@nestjs/common';
import { PayService } from './pay.service';
import { PayController } from './pay.controller';
import { Invoice } from './entities/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckoutSuccessUseCase } from './use-cases/checkout-success.use-case';
import {
  CheckoutFailedUseCase,
  GetRateUseCase,
  UsageRegisterUseCase,
} from './use-cases';
import { StripeModule } from 'src/stripe/stripe.module';
import { Suscription } from 'src/usage/entities/suscription.entity';
import { User } from 'src/auth/entities';
import { Service, Transaction } from 'src/usage/entities';
import { UsageModule } from 'src/usage/usage.module';
import { Rate } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Invoice,
      Suscription,
      User,
      Transaction,
      Service,
      Rate
    ]),
    StripeModule,
    UsageModule,
  ],
  controllers: [PayController],
  providers: [
    PayService,
    CheckoutSuccessUseCase,
    CheckoutFailedUseCase,
    UsageRegisterUseCase,
    GetRateUseCase,
  ],
  exports: [UsageRegisterUseCase, GetRateUseCase],
})
export class PayModule {}
