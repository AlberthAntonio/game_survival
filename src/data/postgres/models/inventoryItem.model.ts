import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Inventory } from "./inventory.model";
import { Items } from "./items.model";

@Entity()
export class InventoryItem extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('int', {
        nullable: false,
        default: 1,
      })
    quantity: number;

    @ManyToOne( () => Inventory, (inventory) => inventory.inventory_items)
    inventory: Inventory;

    @ManyToOne( () => Items, (items) => items.invetory_items)
    item: Items;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}