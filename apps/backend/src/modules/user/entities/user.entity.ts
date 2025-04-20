import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import type { TwitchProfile } from '@/modules/auth/twitch';

export interface TwitchAuthData {
    data: TwitchProfile;
    provider: 'twitch';
}

export type AuthData = TwitchAuthData

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        description: 'Уникальный идентификатор пользователя',
        example: '1a2b3c4d-5678-90ef-gh12-3456789ijklm'
    })
    id: string;

    @Column({
        type: 'varchar',
        name: 'external_id',
        nullable: false
    })
    externalId: string;

    @Column({
        type: 'jsonb',
        name: 'auth_data',
        nullable: false
    })
    @ApiProperty({
        description: 'Данные аутентификации пользователя'
    })
    authData: AuthData;

    @Column({
        type: 'varchar',
        name: 'username',
        nullable: false
    })
    username: string;

    @Column({
        type: 'varchar',
        name: 'email',
        nullable: true
    })
    email: string;

    @Column({
        type: 'varchar',
        name: 'avatar',
        nullable: false
    })
    avatar: string;
}
