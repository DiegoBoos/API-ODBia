import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { DataSourceConfig } from './config';
import { AuthModule } from './auth/auth.module';
import { MailjetModule } from './common/mailjet/mailjet.module';
import { UsageModule } from './usage/usage.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DataSourceConfig),
    AuthModule,
    MailjetModule,
    UsageModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
