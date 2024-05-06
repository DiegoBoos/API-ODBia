import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/entities';
import { CheckoutFailedUseCase, CheckoutSuccessUseCase } from './use-cases';
import { SessionDto } from './dtos';

@Injectable()
export class PayService {
  constructor(
    private readonly checkoutSuccessUseCase: CheckoutSuccessUseCase,
    private readonly checkoutFailedUseCase: CheckoutFailedUseCase,
  ) {}

  async checkoutSucces(sessionDto: SessionDto) {
    return await this.checkoutSuccessUseCase.execute(sessionDto);
  }

  async checkoutFailed(sessionDto: SessionDto, user: User) {
    return await this.checkoutFailedUseCase.execute(sessionDto, user);
  }
}
