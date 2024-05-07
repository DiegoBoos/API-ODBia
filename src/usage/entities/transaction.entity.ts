import { ApiProperty } from "@nestjs/swagger";
import { Length, IsNotEmpty } from "class-validator";
import { Tenant } from "src/auth/entities";
import { Service } from "src/usage/entities";
import { Suscription } from "src/usage/entities/suscription.entity";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";


@Entity({ name: 'transactions', schema: 'business'})
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => Suscription, (suscription) => suscription.transactions)
  @JoinColumn({ name: 'suscription_id' })
  suscription?: Suscription;

  @Column({ name: 'suscription_id' })
  suscriptionId: string;

  @ManyToOne(() => Service, (service) => service.transactions)
  @JoinColumn({ name: 'service_id' })
  service?: Service;

  @Column({ name: 'service_id' })
  serviceId: string;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @Column({ name: 'platform' })
  platform: string;

  @ApiProperty()
  @Column({ name: 'model' })
  model: string;

  @ApiProperty()
  @Column({ name: 'usage_cost', type: 'float' })
  usageCost: number;

  @ApiProperty()
  @Column({ name: 'usage_price', type: 'float' })
  usagePrice: number;

  @ApiProperty()
  @Column({ name: 'input_tokens', type: 'int' })
  inputTokens: number;

  @ApiProperty()
  @Column({ name: 'output_tokens', type: 'int' })
  outputTokens: number;

}