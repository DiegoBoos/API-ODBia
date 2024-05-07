import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';
import { GetSuscriptionsUseCase } from '../use-cases';

@Injectable()
export class CashVerifyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly getSuscriptionUseCase: GetSuscriptionsUseCase
) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {


    const req = context.switchToHttp().getRequest();

    const { body, user } = req;

    if (!user.currentSuscriptionId) {
        throw new ForbiddenException(`Suscription Expired`);
    }

    const suscription = await this.getSuscriptionUseCase.execute(user);
    console.log(suscription);
    

    throw new ForbiddenException(`insufficient balance`);
  }
}
