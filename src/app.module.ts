import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { DataSourceConfig } from '../config';
import { AuthModule } from './auth/auth.module';
import { MailjetModule } from './common/mailjet/mailjet.module';
import { UsageModule } from './usage/usage.module';
import { StripeModule } from './stripe/stripe.module';
import { PayModule } from './pay/pay.module';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DataSourceConfig),
    AuthModule,
    MailjetModule,
    UsageModule,
    StripeModule,
    PayModule,
    OpenaiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
