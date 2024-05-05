import { Module } from '@nestjs/common';
import { UsageService } from './usage.service';
import { UsageController } from './usage.controller';
import { GetSuscriptionsUseCase } from './use-cases';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suscription } from './entities/suscription.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Suscription]),
  ],
  controllers: [UsageController],
  providers: [UsageService, GetSuscriptionsUseCase],
})
export class UsageModule {}
