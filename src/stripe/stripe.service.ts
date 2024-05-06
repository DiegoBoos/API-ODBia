import { Injectable } from '@nestjs/common';
import { CheckoutUseCase } from './use-cases';
import { User } from 'src/auth/entities';

@Injectable()
export class StripeService {
  constructor(private readonly checkoutUseCase: CheckoutUseCase) {}

  async createCheckout(user: User) {
    return await this.checkoutUseCase.create(user);
  }
}
