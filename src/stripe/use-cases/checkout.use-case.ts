import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import * as dotenv from 'dotenv';
import { HandlerCustomerUseCase } from './handler-customer.use-case';
import { CkeckoutSession } from '../interfaces/checkout-session.interface';
import { UserAccount } from 'src/auth/interfaces';

// Cargar variables de entorno desde .env
dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(process.env.STRIPE_SECRET_KET);

@Injectable()
export class CheckoutUseCase {
  private readonly logger = new Logger('CheckoutUseCase');

  constructor(
    private readonly handlerCustomerUseCase: HandlerCustomerUseCase,
  ) {}

  async create(user: UserAccount) {
    try {
      const customer = await this.handlerCustomerUseCase.execute(user);

      const session: CkeckoutSession = await stripe.checkout.sessions.create({
        line_items: [{ price: process.env.STRIPE_ITEM_ID, quantity: 1 }],
        mode: 'payment',
        customer: customer.id,
        success_url: `${process.env.HOST}:${process.env.PORT}/${process.env.STRIPE_SUCCESS_ENDPOINT}?sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.HOST}:${process.env.PORT}/${process.env.STRIPE_FAILED_ENDPOINT}`,
      });

      return session;
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async retrieve(sessionId: string) {

    try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return session;

  } catch (error) {
    this.logger.log(error);
    throw new BadRequestException(error.message);
  }

  }

}
