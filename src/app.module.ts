import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { DataSourceConfig } from './config';
import { AuthModule } from './auth/auth.module';
import { MailjetModule } from './common/mailjet/mailjet.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DataSourceConfig),
    AuthModule,
    MailjetModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
