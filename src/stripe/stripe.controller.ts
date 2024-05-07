import { Controller, Get } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { UserAccount } from 'src/auth/interfaces';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('create-checkout')
  @Auth()
  checkout(@GetUser() user: UserAccount) {
    return this.stripeService.createCheckout(user);
  }

}
