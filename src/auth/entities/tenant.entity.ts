import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

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

  // @ApiProperty({
  //   description: 'Birthday',
  // })
  // @Column({ name: 'birthday', type: 'date' })
  // @IsNotEmpty()
  // birthday: Date;

  @Column({ name: 'created_at', type: 'date' })
  createdAt: Date;

  @OneToMany(() => User, (user) => user.tenant)
  users?: User[];
}
