import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Service } from 'src/usage/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RunSeedUseCase } from './use-cases';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service]),
  ],
  controllers: [SeedController],
  providers: [SeedService, RunSeedUseCase],
})
export class SeedModule {}
