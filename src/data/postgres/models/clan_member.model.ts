import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Player } from "./player.model";
import { Clans } from "./clans.model";

export enum RoleClan {
    MASTER = "MASTER",
    OFFICER = "OFFICER",
    SUBOFFICER = "SUBOFFICER",
    MEMBER = "MEMBER"
}

@Entity()
export class Clan_member extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('enum', {
        enum: RoleClan,
        default: RoleClan.MEMBER
    })
    role: RoleClan;

    @ManyToOne(() => Player, (player) => player.clan_members)
    player: Player;

    @ManyToOne(() => Clans, (clans) => clans.clan_members)
    clans: Clans;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}