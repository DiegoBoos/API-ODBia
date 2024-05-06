import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { CheckoutUseCase, HandlerCustomerUseCase } from './use-cases';

@Module({
  controllers: [StripeController],
  providers: [
    StripeService, 
    CheckoutUseCase,
    HandlerCustomerUseCase
  ],
  exports: [
    CheckoutUseCase
  ]
})
export class StripeModule {}
