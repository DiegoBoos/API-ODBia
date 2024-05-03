import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usage } from './usage.entity';

@Entity()
export class Service {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'rate', type: 'float' })
    rate: number;

    @OneToMany(() => Usage, usage => usage.service)
    usages?: Usage[];
}
