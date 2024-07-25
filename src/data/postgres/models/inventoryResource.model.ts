import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Inventory } from "./inventory.model";
import { Resource } from "./resources.model";

@Entity()
export class Inventory_resource extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('int', {
        nullable: false,
        default: 1,
      })
      quantity: number;

    @ManyToOne( () => Inventory, (inventory) => inventory.inventory_resources)
    inventory: Inventory;
    
    @ManyToOne( () => Resource, (resource) => resource.inventory_resources)
    resource: Resource; 

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}