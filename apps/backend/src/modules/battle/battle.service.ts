import type { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@/shared';

import type { Battle } from './entities';
import type { BattleGameStatus } from './enums';

import { BattleGame } from './entities';

@Injectable()
export class BattleGameService extends BaseService<BattleGame> {
  constructor(
    @InjectRepository(BattleGame)
    private readonly BattleGameRepository: Repository<BattleGame>
  ) {
    super(BattleGameRepository);
  }

  transformBattleGame(battleGame: BattleGame): Battle {
    return {
      id: battleGame.id,
      name: battleGame.name,
      status: battleGame.status as BattleGameStatus.PREPARE | BattleGameStatus.PROGRESS | BattleGameStatus.WAIT,
      master: battleGame.master,
      challenger: battleGame.challenger,
      password: !!battleGame.password,
      spectate: battleGame.spectate,
    };
  }
}
