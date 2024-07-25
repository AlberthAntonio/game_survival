import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Inventory_resource } from "./inventoryResource.model";

@Entity()
export class Resource extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {
        length: 80,
        nullable: false,
    })
    name: string;

    @Column('text', {
        nullable: false,
    })
    description: string;

    @OneToMany( () => Inventory_resource, (inventory_resource) => inventory_resource.resource)
    inventory_resources: Inventory_resource[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}