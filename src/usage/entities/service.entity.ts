import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from '.';


@Entity({ name: 'services', schema: 'business' })
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'rate', type: 'float' })
  rate: number;

  @OneToMany(() => Transaction, (transaction) => transaction.service)
  transactions?: Transaction[];
}
