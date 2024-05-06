import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Usage } from './usage.entity';
import { Tenant } from 'src/auth/entities';

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

  @OneToMany(() => Usage, (usage) => usage.suscription)
  usages?: Usage[];

  @ManyToOne(() => Tenant, (tenant) => tenant.suscriptions)
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;

  @Column({ name: 'tenant_id' })
  tenantId: string;
}
