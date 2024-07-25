import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Clan_member } from "./clan_member.model";

@Entity()
export class Clans extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {
        length: 255,
        nullable: false
    })
    name: string;

    @OneToMany(() => Clan_member, (clan_member) => clan_member.clans)
    clan_members: Clan_member[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}