import { Body, Controller, Post } from '@nestjs/common';
import { ChatBotService } from './chat-bot.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { UserAccount } from 'src/auth/interfaces';
import { ChatDto } from './dtos/chat.dto';

@Controller('chat-bot')
@Auth()
export class ChatBotController {
  constructor(private readonly chatBotService: ChatBotService) {}

  @Post('ask')
  chat(@Body() chat: ChatDto, @GetUser() user: UserAccount) {
    return this.chatBotService.ask(chat, user);
  }

}
