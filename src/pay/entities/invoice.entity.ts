import { ApiProperty } from "@nestjs/swagger";
import { Length, IsNotEmpty } from "class-validator";
import { Tenant } from "src/auth/entities";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";


@Entity({ name: 'invoices', schema: 'business'})
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty()
  @Column({ name: 'state' })
  state: string;

  @ApiProperty()
  @Column({ name: 'session_id' })
  sessionId: string;

  @ApiProperty()
  @Column({ name: 'amount_subtotal', type: 'float' })
  amountSubtotal: number;

  @ApiProperty()
  @Column({ name: 'amount_total', type: 'float' })
  amountTotal: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'currency' })
  currency: string;

  @Column({ name: 'country' })
  country: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.invoices)
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;

  @Column({ name: 'tenant_id' })
  tenantId: string;
}