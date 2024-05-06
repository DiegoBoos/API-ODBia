import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, MoreThan, Repository } from 'typeorm';
import { User } from 'src/auth/entities';
import { Invoice } from '../entities/invoice.entity';
import { SessionDto } from '../dtos';
import { CheckoutUseCase } from 'src/stripe/use-cases';
import { CkeckoutSession } from 'src/stripe/interfaces/checkout-session.interface';
import { Suscription } from 'src/usage/entities/suscription.entity';

@Injectable()
export class CheckoutSuccessUseCase {
  private readonly logger = new Logger('CheckoutSuccessUseCase');

  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,

    @InjectRepository(Suscription)
    private readonly suscriptionRepository: Repository<Suscription>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly checkoutUseCase: CheckoutUseCase,

    private readonly dataSource: DataSource,
  ) {}

  async execute(sessionDto: SessionDto) {
    const { sessionId } = sessionDto;

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    try {
      const session: CkeckoutSession =
        await this.checkoutUseCase.retrieve(sessionId);

      if (session.status === 'complete') {
        const searchInvoice = await this.invoiceRepository.findOne({
          where: { sessionId },
        });

        const { email } = session.customer_details;
        const user = await queryBuilder
          .where({ email })
          .leftJoinAndSelect('user.tenant', 'tenant')
          .getOne();

        if (!user) {
          throw new BadRequestException('Unsuccessful payment.');
        }

        if (!searchInvoice) {
          const queryRunner = this.dataSource.createQueryRunner();
          try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const invoice: Invoice = {
              state: session.status,
              sessionId: sessionId,
              amountTotal: session.amount_total / 100,
              amountSubtotal: session.amount_total / 100,
              currency: session.currency,
              country: session.customer_details.address.country,
              createdAt: new Date(),
              tenantId: user.tenantId,
            };
            const newInvoice = this.invoiceRepository.create(invoice);
            const savedInvoice = await queryRunner.manager.save(newInvoice);

            const currentSuscription = await this.suscriptionRepository.findOne(
              { where: { expirationDate: MoreThan(new Date()) } },
            );

            if (currentSuscription) {
              const cash = currentSuscription.cash + invoice.amountTotal;
              await queryRunner.manager.update(
                Suscription,
                currentSuscription.id,
                { cash },
              );
            } else {
              const currentDate = new Date();
              const monthsToAdd = parseInt(
                process.env.SUSCRIPTION_TIME_MONTHS_EXPIRE || '1',
                10,
              );
              const expirationDate = new Date(
                currentDate.setMonth(currentDate.getMonth() + monthsToAdd),
              );
              const suscription: Suscription = {
                receivedDate: new Date(),
                cash: invoice.amountTotal,
                expirationDate,
                tenantId: user.tenantId,
              };

              const newSuscription =
                this.suscriptionRepository.create(suscription);
              await queryRunner.manager.save(newSuscription);
            }

            // ********** Commit Transaction **********
            await queryRunner.commitTransaction();
            await queryRunner.release();

            return savedInvoice;
          } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();

            this.logger.error(error);
            throw new BadRequestException(`${error.message}`);
          }
        } else {
          throw new BadRequestException('Payment already registered.');
        }
      } else {
        throw new BadRequestException('Unsuccessful payment.');
      }
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException(error.message);
    }
  }
}
