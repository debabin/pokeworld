import { ApiProperty } from "@nestjs/swagger";

import { PlayerStatus } from "../enums";

export class BattleUser {
    @ApiProperty({
        description: 'Unique identifier for the user',
        example: 'user-id'
    })
    id: string;

    @ApiProperty({
        description: 'Status of the user in the game',
        enum: PlayerStatus,
        example: PlayerStatus.PLAYER
    })
    status: PlayerStatus;

    @ApiProperty({
        description: 'Name of the user',
        example: 'Player Name'
    })
    name: string;

    @ApiProperty({
        description: 'Items owned by the user',
        type: Array,
        example: []
    })
    items: any[];

    @ApiProperty({
        description: 'Pokemons owned by the user',
        type: Array,
        example: []
    })
    pokemons: any[];
}
