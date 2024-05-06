import { Controller, Get, Query } from '@nestjs/common';
import { PayService } from './pay.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities';
import { SessionDto } from './dtos';

@Controller('pay')
export class PayController {
  constructor(private readonly payService: PayService) {}

  @Get('success-checkout')
  checkoutSucces(@Query() sessionDto: SessionDto) {
    return this.payService.checkoutSucces(sessionDto);
  }

}
