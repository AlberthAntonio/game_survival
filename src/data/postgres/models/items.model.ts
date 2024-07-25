import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { InventoryItem } from "./inventoryItem.model";

@Entity()
export class Items extends BaseEntity {

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

    @OneToMany(() => InventoryItem, (inventoryItem) => inventoryItem.item)
    invetory_items: InventoryItem[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}