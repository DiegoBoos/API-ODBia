import { Injectable } from '@nestjs/common';
import { CheckoutUseCase } from './use-cases';
import { UserAccount } from 'src/auth/interfaces';

@Injectable()
export class StripeService {
  constructor(private readonly checkoutUseCase: CheckoutUseCase) {}

  async createCheckout(user: UserAccount) {
    return await this.checkoutUseCase.create(user);
  }
}
