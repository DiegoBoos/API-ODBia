import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiController } from './openai.controller';
import { PayModule } from 'src/pay/pay.module';
import { TranslateUseCase } from './use-cases';
import { UsageModule } from 'src/usage/usage.module';

@Module({
  imports: [PayModule, UsageModule],
  controllers: [OpenaiController],
  providers: [OpenaiService, TranslateUseCase],
})
export class OpenaiModule {}
