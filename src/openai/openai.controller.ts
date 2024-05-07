import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { TranslateDto } from './dtos';
import { Auth, GetUser } from 'src/auth/decorators';
import { UserAccount } from 'src/auth/interfaces';
import { CashVerifyGuard } from 'src/usage/guards';

@Controller('openai')
@UseGuards(CashVerifyGuard)
@Auth()
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('translate')
  // TODO:
  translate(@Body() translateDto: TranslateDto, @GetUser() user: UserAccount) {
    return this.openaiService.translateText(translateDto, user);
  }
  
}
