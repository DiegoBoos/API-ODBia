import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { User } from './user.entity';
import { Usage } from 'src/usage/entities';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty({
    description: 'Full Name',
  })
  @Column({ name: 'full_name', length: 100 })
  @Length(10, 100)
  @IsNotEmpty()
  fullName: string;

  @Column({ name: 'cash', type: 'float', default: 0 })
  cash: number;

  @Column({ name: 'expiration_date', type: 'date', nullable: true })
  expirationDate: Date | null;

  @Column({ name: 'created_at', type: 'date' })
  createdAt: Date;

  @OneToMany(() => User, (user) => user.tenant)
  users?: User[];

  @OneToMany(() => Usage, (usage) => usage.tenant)
  usages?: Usage[];
}
