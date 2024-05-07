import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities';

@Injectable()
export class RegisterTransactionUseCase {
  private readonly logger = new Logger('RegisterTransactionUseCase');

  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async execute(transaction: Transaction) {
    
    const newTransaction = this.transactionRepository.create(transaction);

    const newSaveTRansaction = await this.transactionRepository.save(newTransaction);

    return newSaveTRansaction;
  }
}
