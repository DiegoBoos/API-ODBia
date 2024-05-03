import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'src/usage/entities';
import { Repository } from 'typeorm';
import { initialData } from '../data/seed-data';

export class RunSeedUseCase {
  private readonly logger = new Logger('RunSeedUseCase');

  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async execute() {
    const countServices = await this.serviceRepository.count();
    if (countServices === 0) {
        const seedServices = initialData.services;
        const services: Service[] = [];
        seedServices.forEach( service => {
            services.push(service);
        })
        const dbServices = await this.serviceRepository.save( seedServices );
    }
    return 'SEED EXECUTED';
  }
}
