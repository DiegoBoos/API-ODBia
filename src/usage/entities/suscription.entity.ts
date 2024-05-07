import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Tenant } from 'src/auth/entities';
import { Transaction } from '.';


@Entity({ name: 'suscriptions', schema: 'business' })
export class Suscription {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'cash', type: 'float', default: 0 })
  cash: number;

  @Column({ name: 'received_date', type: 'timestamp', nullable: true })
  receivedDate: Date | null;

  @Column({ name: 'expiration_date', type: 'timestamp', nullable: true })
  expirationDate: Date | null;

  @ManyToOne(() => Tenant, (tenant) => tenant.suscriptions)
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @OneToMany(() => Transaction, (transaction) => transaction.suscription)
  transactions?: Transaction[];
}
