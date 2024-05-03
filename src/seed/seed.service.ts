import { Injectable } from '@nestjs/common';
import { RunSeedUseCase } from './use-cases';

@Injectable()
export class SeedService {
  constructor(private readonly runSeedUseCase: RunSeedUseCase) {}

  async runSeed() {
    return await this.runSeedUseCase.execute();
  }
}
