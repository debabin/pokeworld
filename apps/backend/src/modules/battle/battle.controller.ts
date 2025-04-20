import type { Observable} from 'rxjs';

import { BadRequestException, Body, Controller, Get, Param, Post, Query, Sse } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import type { BaseResponse } from '@/shared';

import { BaseResolver } from '@/shared';

import type { BattlesResponse, PaginationStatisticBattleResponse } from './battle.model';
import type { BattleGameService } from './battle.service';
import type { CreateBattleGameDto, GetBattleGameDto, JoinBattleGameDto } from './dto';
import type { BattleGame } from './entities';

import { BattleGameResponse } from './battle.model';
import { BattleGameStatus, PlayerStatus } from './enums';

@ApiTags('battle')
@Controller('/battle')
export class BattleController extends BaseResolver {
  private readonly battleGameSubject = new Subject<BattleGame>();

  constructor(private readonly battleGameService: BattleGameService) {
    super();
  }

  @Sse('notifications')
  notifications(): Observable<BattleGameResponse> {
    return this.battleGameSubject.asObservable().pipe(
      map(game => this.wrapSuccess({ game }))
    );
  }

  @Get('/battles')
  @ApiOperation({ summary: 'Get battle entities' })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Filter battles by name'
  })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
    isArray: true,
    enum: [BattleGameStatus.WAIT, BattleGameStatus.PREPARE, BattleGameStatus.PROGRESS],
    description: 'Filter battles by status (only wait, prepare, and progress are allowed)'
  })
  @ApiQuery({
    name: 'spectate',
    required: false,
    type: Boolean,
    description: 'Filter battles by spectate flag'
  })
  @ApiQuery({
    name: 'password',
    required: false,
    type: Boolean,
    description: 'Filter battles by password'
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    default: 10,
    description: 'Number of battles to return per page'
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    default: 0,
    description: 'Number of battles to skip'
  })
  @ApiResponse({
    status: 200,
    description: 'List of battle entities',
    type: [BattleGameResponse]
  })
  async getBattles(
    @Query() getBattlesDto: {
      name?: string;
      status?: BattleGameStatus[];
      spectate?: boolean;
      password?: string;
      limit?: number;
      offset?: number
    }
  ): Promise<BattlesResponse> {
    const status = getBattlesDto.status ?? [BattleGameStatus.WAIT, BattleGameStatus.PREPARE, BattleGameStatus.PROGRESS];
    const offset = getBattlesDto.offset ?? 0;
    const limit = getBattlesDto.limit ?? 10;

    const battleQuery = this.battleGameService.createQueryBuilder('battle');

    if (getBattlesDto.name) {
      battleQuery.andWhere('battle.name ILIKE :name', { name: `%${getBattlesDto.name}%` });
    }

    if (status) {
      battleQuery.andWhere('battle.status IN (:...status)', { status });
    }

    if (getBattlesDto.spectate) {
      battleQuery.andWhere('battle.spectate = :spectate', { spectate: getBattlesDto.spectate });
    }
    if (getBattlesDto.password) {
      battleQuery.andWhere('battle.password IS NOT NULL', { password: getBattlesDto.password });
    }

    battleQuery.skip(offset).take(limit);

    const [battleGames, itemCount] = await battleQuery.getManyAndCount();
    const battles = battleGames.map(battleGame => this.battleGameService.transformBattleGame(battleGame));

    const pageCount = Math.ceil(itemCount / limit);
    const page = Math.floor(offset / limit) + 1;
    const prev = page > 1;
    const next = page < pageCount;

    const response = {
      battles,
      offset,
      limit,
      itemCount,
      page,
      pageCount,
      prev,
      next
    } as PaginationStatisticBattleResponse;

    return this.wrapSuccess({ response });
  }

  @Get('/:battleId')
  @ApiOperation({ summary: 'get battle game by id' })
  @ApiParam({
    name: 'battleId',
    type: String,
    description: 'battle game id',
    example: '1a2b3c4d-5678-90ef-gh12-3456789ijklm'
  })
  @ApiResponse({
    status: 200,
    description: 'battle game',
    type: BattleGameResponse
  })
  @ApiResponse({
    status: 400,
    description: 'You are not a player',
    type: BattleGameResponse
  })
  async getBattleGame(@Param() getBattleGameDto: GetBattleGameDto): Promise<BattleGameResponse> {
    const battleGame = await this.battleGameService.findOne({
      where: { id: getBattleGameDto.battleId }
    });

    if (!battleGame.spectate) {
      // const isPlayer = battleGame.master.id === 'id' || battleGame.challenger.id === 'id';
      const isPlayer = Math.random() > 0.5;
      if (!isPlayer) {
        throw new BadRequestException(this.wrapFail('You are not a player', { code: 1 }));
      }
    }

    return this.wrapSuccess({ game: battleGame });
  }

  @Post('/create')
  @ApiOperation({ summary: 'create a new battle game' })
  @ApiResponse({
    status: 201,
    description: 'Battle game created successfully',
    type: BattleGameResponse
  })
  async createBattleGame(@Body() createBattleGameDto: CreateBattleGameDto): Promise<BaseResponse> {
    const master = {
      id: '1',
      name: 'Dima',
      image: '',
      status: PlayerStatus.PLAYER
    }
    const battleGame = await this.battleGameService.save({
      ...createBattleGameDto,
      master
    });

    this.battleGameSubject.next(battleGame);
    return this.wrapSuccess();
  }

  @Post('/:battleId/join')
  @ApiOperation({ summary: 'join an existing battle game' })
  @ApiResponse({
    status: 200,
    description: 'Successfully joined the battle game',
    type: BattleGameResponse
  })
  async joinBattleGame(@Body() joinBattleGameDto: JoinBattleGameDto): Promise<BattleGameResponse> {
    const battleGame = await this.battleGameService.findOne({
      where: { id: joinBattleGameDto.id }
    });

    if (battleGame.status !== BattleGameStatus.WAIT) {
      throw new BadRequestException(this.wrapFail('Battle game is already started', { code: 3 }));
    }

    if (battleGame.password && battleGame.password !== joinBattleGameDto.password) {
      throw new BadRequestException(this.wrapFail('Invalid password', { code: 2 }));
    }

    const challenger = {
      id: '1',
      name: 'Dima2',
      image: '',
      status: PlayerStatus.PLAYER
    }

    await this.battleGameService.update(battleGame.id, {
      challenger,
      status: BattleGameStatus.PREPARE
    });

    this.battleGameSubject.next(battleGame);
    return this.wrapSuccess({ game: battleGame });
  }
}

// 1. dto 
// 2. sse for battle entity (battle game -> battle)
// 3. add spectator fillter + fix orders return from battles endpoint
// 4. twitch auth
