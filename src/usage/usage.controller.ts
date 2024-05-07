import { Controller, Get } from '@nestjs/common';
import { UsageService } from './usage.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { UserAccount } from 'src/auth/interfaces';

@Controller('usage')
export class UsageController {
  constructor(private readonly usageService: UsageService) {}

  @Get('suscriptions')
  @Auth()
  getSuscriptions( @GetUser() user: UserAccount ) {
    return this.usageService.getSuscriptions(user);
  }

}
