import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { DataSourceConfig } from '../config';
import { AuthModule } from './auth/auth.module';
import { MailjetModule } from './common/mailjet/mailjet.module';
import { UsageModule } from './usage/usage.module';
import { StripeModule } from './stripe/stripe.module';
import { PayModule } from './pay/pay.module';
import { OpenaiModule } from './openai/openai.module';
import { WSocketModule } from './wsocket/wsocket.module';
import { ChatBotModule } from './chat-bot/chat-bot.module';



@Module({
  imports: [
    TypeOrmModule.forRoot(DataSourceConfig),
    AuthModule,
    MailjetModule,
    UsageModule,
    StripeModule,
    PayModule,
    OpenaiModule,
    WSocketModule,
    ChatBotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
