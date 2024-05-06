import { Controller, Get } from '@nestjs/common';
import { UsageService } from './usage.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities';

@Controller('usage')
export class UsageController {
  constructor(private readonly usageService: UsageService) {}

  @Get('suscriptions')
  @Auth()
  getSuscriptions( @GetUser() user: User ) {
    return this.usageService.getSuscriptions(user);
  }

}
