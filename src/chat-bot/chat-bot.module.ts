import { Module } from '@nestjs/common';
import { ChatBotService } from './chat-bot.service';
import { ChatBotController } from './chat-bot.controller';
import { AskUseCase } from './use-cases';
import { PayModule } from 'src/pay/pay.module';
import { UsageModule } from 'src/usage/usage.module';

@Module({
  imports: [PayModule, UsageModule],
  controllers: [ChatBotController],
  providers: [ChatBotService, AskUseCase],
})
export class ChatBotModule {}
