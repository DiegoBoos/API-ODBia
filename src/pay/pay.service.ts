import { Injectable } from '@nestjs/common';
import { CheckoutFailedUseCase, CheckoutSuccessUseCase } from './use-cases';
import { SessionDto } from './dtos';
import { UserAccount } from 'src/auth/interfaces';

@Injectable()
export class PayService {
  constructor(
    private readonly checkoutSuccessUseCase: CheckoutSuccessUseCase,
    private readonly checkoutFailedUseCase: CheckoutFailedUseCase,
  ) {}

  async checkoutSucces(sessionDto: SessionDto) {
    return await this.checkoutSuccessUseCase.execute(sessionDto);
  }

  async checkoutFailed(sessionDto: SessionDto, user: UserAccount) {
    return await this.checkoutFailedUseCase.execute(sessionDto, user);
  }
}
