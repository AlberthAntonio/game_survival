import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.model";
import { Construction } from "./constructions.model";
import { Quest_player } from "./questPlayer.model";
import { Clan_member } from "./clan_member.model";
import { Inventory } from "./inventory.model";

@Entity()
export class Player extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {
        length: 80,
        nullable: false,
        unique: true
    })
    name: string;
    
    @Column('int', {
        nullable: false,
        default: 1
    })
    level: number;
    
    @Column('float', {
        nullable: false,
        default: 0
    })
    experience: number;
    
    @Column('float', {
        nullable: false,
        default: 80
    })
    heald: number;
    
    @Column('float', {
        nullable: false,
        default: 100
    })
    energy: number;
    
    @ManyToOne(() => User, (user) => user.players)
    user: User;
    
    @OneToMany(() => Construction, (construction) => construction.player)
    constructions: Construction[];
    
    @OneToMany(() => Quest_player, (quest_player) => quest_player.player)
    quest_players: Quest_player[];

    @OneToMany(() => Clan_member, (clan_member) => clan_member.player)
    clan_members: Clan_member[];

    @OneToOne(() => Inventory, (inventory) => inventory.player)
    inventory: Inventory;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}