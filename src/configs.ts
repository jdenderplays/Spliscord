import { ClientOptions } from 'discord.js';
import { Entity, Column, PrimaryColumn } from 'typeorm';

export interface BotConfig {
    token: {
        path: string;
        name: string;
    };
    client: ClientOptions;
    contributors: {
        name: string;
        id: string;
        roles: number[];
    }[];
}

@Entity()
export class UserConfig {

    @PrimaryColumn('text')
    id: string;

    @Column({type:'text', nullable: true})
    prefix: string | null;
}

@Entity()
export class GuildConfig {

    @PrimaryColumn('text')
    id: string;

    @Column({type:'text', nullable: true})
    prefix: string | null;

    @Column({type:'text', nullable: true})
    adminRole: string | null;

    @Column({type:'text', nullable: true})
    modRole: string | null;
}