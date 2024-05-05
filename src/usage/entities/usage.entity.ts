import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Tenant } from 'src/auth/entities';
import { Service } from './service.entity';
import { Suscription } from './suscription.entity';


@Entity({ name: 'usages', schema: 'business'})
export class Usage {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ManyToOne(() => Service, service => service.usages)
    @JoinColumn({ name: 'service_id' })
    service?: Service;

    @Column({ name: 'service_id' })
    serviceId: string

    @ManyToOne(() => Suscription, suscription => suscription.usages)
    @JoinColumn({ name: 'suscription_id' })
    suscription?: Suscription;

    @Column({ name: 'suscription_id' })
    suscriptionId: string;

    @Column({ name: 'units', type: 'int' })
    units: number;

    @Column({ name: 'cost', type: 'float' })
    cost: number;

}
