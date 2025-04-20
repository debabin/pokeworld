import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse, PaginationResponse } from '@/shared';

import { Battle, BattleGame } from './entities';

export class BattleGameResponse extends BaseResponse {
  @ApiProperty({ description: 'Battle game', type: BattleGame })
  game: BattleGame;
}

export class PaginationStatisticBattleResponse extends PaginationResponse {
  @ApiProperty({ description: 'Battle', type: [Battle] })
  battles: Battle[];
}

export class BattlesResponse extends BaseResponse {
  @ApiProperty({
    description: 'Battles with pagination',
    type: PaginationStatisticBattleResponse
  })
  response: PaginationStatisticBattleResponse;
}
