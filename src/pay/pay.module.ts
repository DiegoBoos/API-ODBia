import { Module } from '@nestjs/common';
import { PayService } from './pay.service';
import { PayController } from './pay.controller';
import { Invoice } from './entities/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckoutSuccessUseCase } from './use-cases/checkout-success.use-case';
import { CheckoutFailedUseCase } from './use-cases';
import { StripeModule } from 'src/stripe/stripe.module';
import { Suscription } from 'src/usage/entities/suscription.entity';
import { User } from 'src/auth/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice, Suscription, User]),
    StripeModule
  ],
  controllers: [PayController],
  providers: [PayService, CheckoutSuccessUseCase, CheckoutFailedUseCase],
})
export class PayModule {}
