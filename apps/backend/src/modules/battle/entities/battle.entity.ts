import { ApiProperty } from '@nestjs/swagger';

import { BattleGameStatus } from '../enums';
import { BattleUser } from './battle-user.entity';

export class Battle {
  @ApiProperty({
    description: 'Unique identifier for the battle',
    example: '1'
  })
  id: string;

  @ApiProperty({
    description: 'Name of the battle',
    example: 'Epic Pokemon Battle'
  })
  name: string;

  @ApiProperty({
    description: 'Password protection for the battle',
    example: true
  })
  password: boolean;

  @ApiProperty({
    description: 'Spectate flag for the battle',
    example: true
  })
  spectate: boolean;

  @ApiProperty({
    description: 'Status of the game',
    enum: BattleGameStatus,
    example: BattleGameStatus.WAIT
  })
  status: BattleGameStatus;

  @ApiProperty({
    description: 'Master of the game',
    type: BattleUser
  })
  master: BattleUser;

  @ApiProperty({
    description: 'Challenger of the game',
    type: BattleUser
  })
  challenger: BattleUser | null;
}
