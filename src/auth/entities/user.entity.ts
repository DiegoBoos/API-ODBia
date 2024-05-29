import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Tenant } from './tenant.entity';
import { ApiProperty } from '@nestjs/swagger';
import { AuthProviderEnum } from '../interfaces/auth-provider.enum';

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

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt?: Date;

  @Column({ name: 'last_password_changed_date', type: 'timestamp', nullable: true })
  lastPasswordChangedDate?: Date;

  @Column({ name: 'last_login_date', type: 'timestamp', nullable: true })
  lastLoginDate?: Date;

  @Column({
    name: 'auth_provider',
    type: "enum",
    enum: AuthProviderEnum,
    default: AuthProviderEnum.EMAIL
  })
  authProvider: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.users)
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;


}
