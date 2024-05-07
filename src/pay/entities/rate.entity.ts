import { ApiProperty } from "@nestjs/swagger";
import { Length, IsNotEmpty } from "class-validator";
import { Tenant } from "src/auth/entities";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";


@Entity({ name: 'rates', schema: 'business'})
export class Rate {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty()
  @Column({ name: 'platform' })
  platform: string;

  @ApiProperty()
  @Column({ name: 'model' })
  model: string;

  @ApiProperty()
  @Column({ name: 'cost_input_per_1k', type: 'float' })
  costInputPer1k: number;

  @ApiProperty()
  @Column({ name: 'cost_output_per_1k', type: 'float' })
  costOutputPer1k: number;

  @ApiProperty()
  @Column({ name: 'price_input_per_1k', type: 'float' })
  priceInputPer1k: number;

  @ApiProperty()
  @Column({ name: 'price_output_per_1k', type: 'float' })
  priceOutputPer1k: number;

}