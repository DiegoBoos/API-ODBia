import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Tenant } from './tenant.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users', schema: 'auth'})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty({
    description: 'Email',
  })
  @Column({ name: 'email', unique: true })
  email: string;

  @ApiProperty({
    description: 'Email',
  })
  @Column({ name: 'password', nullable: true })
  password?: string;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @Column({ name: 'created_at', type: 'date' })
  createdAt?: Date;

  @Column({ name: 'last_password_changed_date', nullable: true })
  lastPasswordChangedDate?: Date;

  @ManyToOne(() => Tenant, (tenant) => tenant.users)
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;


}
