import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from '../entities/invoice.entity';
import { SessionDto } from '../dtos';
import { CkeckoutSession } from 'src/stripe/interfaces/checkout-session.interface';
import { CheckoutUseCase } from 'src/stripe/use-cases';
import { UserAccount } from 'src/auth/interfaces';

@Injectable()
export class CheckoutFailedUseCase {
  private readonly logger = new Logger('CheckoutFailedUseCase');

  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly checkoutUseCase: CheckoutUseCase,
  ) {}

  async execute(sessionDto: SessionDto, user: UserAccount) {
    const { tenantId } = user;
    const { sessionId } = sessionDto;

    
    try {
      const session: CkeckoutSession = await this.checkoutUseCase.retrieve(sessionId);

      // TODO: Determinar que proceso hacer ante un fallo en el pago
  
      throw new BadRequestException('Payment Failed.');
  
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException(error.message);
    }
  }
}
