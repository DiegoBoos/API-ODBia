import { Controller, Get } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('create-checkout')
  @Auth()
  checkout(@GetUser() user: User) {
    return this.stripeService.createCheckout(user);
  }

}
