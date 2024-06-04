import { Controller, Get, Query, Redirect } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { PayService } from './pay.service';
import { SessionDto } from './dtos';

dotenv.config();

@Controller('pay')
export class PayController {
  constructor(private readonly payService: PayService) {}

  @Get('success-checkout')
  @Redirect(process.env.REDIRECT_SUCCESS_FRONTEND, 302)
  async checkoutSuccess(@Query() sessionDto: SessionDto) {
    return this.payService.checkoutSuccess(sessionDto);
  }

}
