import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Player } from "./player.model";
import { InventoryItem } from "./inventoryItem.model";
import { Inventory_resource } from "./inventoryResource.model";

@Entity()
export class Inventory extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Player, (player) => player.inventory)
    @JoinColumn()
    player: Player;

    @OneToMany(() => Inventory_resource, (inventory_resource) => inventory_resource.inventory)
    inventory_resources: Inventory_resource[];

    @OneToMany(() => InventoryItem, (inventory_items) => inventory_items.inventory)
    inventory_items: InventoryItem[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}