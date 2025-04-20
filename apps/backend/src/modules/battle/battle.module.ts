import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BattleController } from './battle.controller';
import { BattleGameService } from './battle.service';
import { BattleGame } from './entities';

@Module({
  controllers: [BattleController],
  imports: [TypeOrmModule.forFeature([BattleGame])],
  exports: [TypeOrmModule],
  providers: [BattleGameService]
})
export class BattleModule { }
