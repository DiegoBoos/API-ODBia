import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Tenant } from 'src/auth/entities';
import { Service } from './service.entity';


@Entity()
export class Usage {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ManyToOne(() => Service, service => service.usages)
    @JoinColumn({ name: 'service_id' })
    service?: Service;

    @Column({ name: 'service_id' })
    serviceId: string

    @ManyToOne(() => Tenant, tenant => tenant.usages)
    @JoinColumn({ name: 'tenant_id' })
    tenant?: Tenant;

    @Column({ name: 'tenant_id' })
    tenantId: string;

    @Column({ name: 'units', type: 'int' })
    units: number;

    @Column({ name: 'cost', type: 'float' })
    cost: number;

    @Column({ name: 'timestamp', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;
}
