import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import * as dotenv from 'dotenv';
import { User } from 'src/auth/entities';

// Cargar variables de entorno desde .env
dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(process.env.STRIPE_SECRET_KET)



@Injectable()
export class HandlerCustomerUseCase {
  private readonly logger = new Logger('HandlerCustomerUseCase');

  constructor() {}

  async execute(user: User) {

  try {
    
    const searchCustomer = await stripe.customers.search({
      query: `email:\'${user.email}\'`
    });

    const { data } = searchCustomer;

    if (data.length === 0) {

      const customer = await stripe.customers.create({
        email: user.email,
      });

      return customer
    } else {
      const customer = data[0];
      return customer;
    }

  } catch (error) {
    this.logger.log(error);
    throw new NotFoundException(error.message);
  }
    
  }
}
