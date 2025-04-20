import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BattleGameStatus } from '../enums';
import { BattleUser } from './battle-user.entity';


@Entity('battle_game')
export class BattleGame {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        description: 'Unique identifier for the game',
        example: '1'
    })
    id: string;

    @Column({ type: 'text', nullable: false })
    @ApiProperty({
        description: 'Name of the game',
        example: 'Pokemon Battle'
    })
    name: string;

    @Column({ type: 'boolean', default: false })
    @ApiProperty({
        description: 'Spectate flag for the game',
        example: true
    })
    spectate: boolean;

    @Column({ type: 'text', nullable: true })
    @ApiProperty({
        description: 'Password for the game',
        example: '1234'
    })
    password: string | null;

    @Column({
        type: 'enum',
        enum: BattleGameStatus,
        default: BattleGameStatus.WAIT
    })
    @ApiProperty({
        description: 'Status of the game',
        enum: BattleGameStatus,
        example: BattleGameStatus.WAIT
    })
    status: BattleGameStatus;

    @Column({ type: 'json', nullable: false })
    @ApiProperty({
        description: 'Master of the game',
        type: BattleUser
    })
    master: BattleUser;

    @Column({ type: 'json', nullable: true })
    @ApiProperty({
        description: 'Challenger of the game',
        type: BattleUser
    })
    challenger: BattleUser | null;
}
