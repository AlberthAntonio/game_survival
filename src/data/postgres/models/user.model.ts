import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Player } from "./player.model";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {
        length: 80,
        unique: true,
        nullable: false
    })
    username: string;

    @Column('varchar', {
        length: 100,
        nullable: false
    })
    password: string;

    @Column('varchar', {
        length: 120,
        unique: true,
        nullable: false
    })
    email: string;

    @OneToMany(() => Player, (player) => player.user)
    players: Player[];

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

}