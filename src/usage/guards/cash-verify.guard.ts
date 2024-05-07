import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { GetCurrentSuscriptionUseCase } from '../use-cases';
import { CurrentSuscription } from '../interface';
import { GetRateUseCase } from 'src/pay/use-cases';
import { UsageCalculate } from 'src/pay/interfaces';
import { calculateUsage } from '../utils';

@Injectable()
export class CashVerifyGuard implements CanActivate {
  private readonly logger = new Logger('TranslateUseCase');

  constructor(
    private readonly getSuscriptionUseCase: GetCurrentSuscriptionUseCase,
    private readonly getRateUseCase: GetRateUseCase,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { body, user } = req;

    console.log(body);

    if (!user) {
      throw new ForbiddenException(`Invalid Token`);
    }

    const currentSuscription: CurrentSuscription =
      await this.getSuscriptionUseCase.execute(user);

    if (!currentSuscription) {
      throw new ForbiddenException(`Suscription Expired`);
    }

    const { model, prompt } = body;

    if (!model || !prompt) {
      throw new ForbiddenException(`Invalid body`);
    }

    const rate = await this.getRateUseCase.byModel(model);

    if (!rate) {
      this.logger.error('Model rate not found.');
      throw new Error('Model rate not found.');
    }

   
    const usage: UsageCalculate = calculateUsage(prompt, prompt, rate);

    // Se estima que el valor del uso * 2 ya que se desconece el costo de los outputToken
    if (+currentSuscription.cash < (+currentSuscription.totalUsagePrice + usage.totalUsagePrice*2)) {
        throw new ForbiddenException(`Insufficient balance`);
    }

    console.log(currentSuscription);

    return true;
  }
}
