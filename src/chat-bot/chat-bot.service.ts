import { Injectable } from '@nestjs/common';


import { UserAccount } from 'src/auth/interfaces';
import { ChatDto } from './dtos/chat.dto';
import { AskUseCase } from './use-cases';

@Injectable()
export class ChatBotService {

    constructor(
        private readonly askUseCase: AskUseCase
      ){}

    async ask(chatDto: ChatDto, user: UserAccount) {
        return await this.askUseCase.execute(chatDto, user);
      }
}
