import type { SelectQueryBuilder } from 'typeorm';

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import type { PokemonService } from '@/modules/pokemon';

import { BaseResolver, BaseResponse } from '@/shared';

import type {
  ActionPokemonDto,
  GetPokemonStatisticDto,
  GetStatisticPokemonsDto
,
  GetTopPokemonsDto
} from './dto';
import type { PokemonStatistic } from './entities';
import type { PaginationStatisticPokemonsResponse } from './statistic.model';
import type { StatisticService } from './statistic.service';

import { RATING_QUERY } from './query';
import {
  PokemonStatisticResponse,
  StatisticPokemonsResponse,
  TopPokemonsResponse
} from './statistic.model';

@ApiTags('statistic')
@Controller('/statistic')
export class StatisticController extends BaseResolver {
  constructor(
    private readonly statisticService: StatisticService,
    private readonly pokemonService: PokemonService
  ) {
    super();
  }

  @Get('/pokemons')
  @ApiOperation({ summary: 'get pokemons' })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Filter pokemons by name'
  })
  @ApiQuery({
    name: 'types',
    required: false,
    type: String,
    description: 'Filter pokemons by type'
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    default: 10,
    description: 'Number of pokemons to return per page'
  })
  @ApiQuery({
    name: 'offset',
    required: true,
    type: Number,
    default: 0,
    description: 'Number of pokemons to skip'
  })
  @ApiResponse({
    status: 200,
    description: 'pokemons',
    type: StatisticPokemonsResponse
  })
  async getStatisticPokemons(
    @Query() getStatisticPokemonsDto: GetStatisticPokemonsDto
  ): Promise<StatisticPokemonsResponse> {
    const pokemonQuery = (
      await this.pokemonService.createQueryBuilder('pokemon')
    ).leftJoinAndMapOne(
      'pokemon.statistic',
      'statistic',
      'statistic',
      'statistic.pokemonId = pokemon.pokemonId'
    ) as SelectQueryBuilder<PokemonStatistic>;

    const offset = getStatisticPokemonsDto.offset ?? 0;
    const limit = getStatisticPokemonsDto.limit ?? 10;

    const rating = getStatisticPokemonsDto.rating ?? 'desc';

    pokemonQuery.addSelect(RATING_QUERY, 'rating');

    pokemonQuery.addOrderBy('rating', rating.toUpperCase() as 'ASC' | 'DESC');
    pokemonQuery.addOrderBy('statistic.smash', rating.toUpperCase() as 'ASC' | 'DESC');

    if (
      getStatisticPokemonsDto.types &&
      Array.isArray(getStatisticPokemonsDto.types) &&
      getStatisticPokemonsDto.types.length
    ) {
      pokemonQuery.andWhere('pokemon.types @> :types', { types: getStatisticPokemonsDto.types });
    }

    if (getStatisticPokemonsDto.name) {
      pokemonQuery.andWhere('pokemon.name ILIKE :name', {
        name: `%${getStatisticPokemonsDto.name}%`
      });
    }

    pokemonQuery.skip(offset).take(limit);

    const [pokemons, itemCount] = await pokemonQuery.getManyAndCount();
    const pageCount = Math.ceil(itemCount / limit);
    const page = Math.floor(offset / limit) + 1;
    const prev = page > 1;
    const next = page < pageCount;

    const response = {
      pokemons,
      offset,
      limit,
      itemCount,
      page,
      pageCount,
      prev,
      next
    } as PaginationStatisticPokemonsResponse;

    return this.wrapSuccess({ response });
  }

  @Get('/top')
  @ApiOperation({ summary: 'get pokemons' })
  @ApiQuery({
    name: 'count',
    required: false,
    type: Number,
    description: 'Filter pokemons by name'
  })
  @ApiResponse({
    status: 200,
    description: 'Top pokemons',
    type: TopPokemonsResponse
  })
  async getTopPokemons(
    @Query() getTopPokemonsDto: GetTopPokemonsDto
  ): Promise<TopPokemonsResponse> {
    const { count = 10 } = getTopPokemonsDto;
    const pokemonQuery = (
      await this.pokemonService.createQueryBuilder('pokemon')
    ).leftJoinAndMapOne(
      'pokemon.statistic',
      'statistic',
      'statistic',
      'statistic.pokemonId = pokemon.pokemonId'
    ) as SelectQueryBuilder<PokemonStatistic>;

    pokemonQuery.addSelect(RATING_QUERY, 'rating');

    pokemonQuery.addOrderBy('rating', 'DESC');
    pokemonQuery.take(count);
    pokemonQuery.addOrderBy('statistic.smash', 'DESC');

    const pokemons = await pokemonQuery.getMany();

    return this.wrapSuccess({ pokemons });
  }

  @Get('/:pokemonId')
  @ApiOperation({ summary: 'get pokemon statistic' })
  @ApiParam({
    name: 'pokemonId',
    type: Number,
    description: 'pokemon id',
    example: '1'
  })
  @ApiResponse({
    status: 200,
    description: 'pokemon statistic',
    type: PokemonStatisticResponse
  })
  async getPokemonStatistic(
    @Param() getPokemonStatisticDto: GetPokemonStatisticDto
  ): Promise<PokemonStatisticResponse> {
    const statistic = await this.statisticService.findOne({
      where: { pokemonId: getPokemonStatisticDto.pokemonId }
    });
    return this.wrapSuccess({ statistic });
  }

  @Post('/action')
  @ApiOperation({ summary: 'create pokemon statistic' })
  @ApiBody({ type: ActionPokemonDto })
  @ApiResponse({
    status: 200,
    description: 'create pokemon statistic status',
    type: BaseResponse
  })
  async actionPokemonStatistic(
    @Body() actionPokemonStatisticDto: { pokemonId: number; action: 'pass' | 'smash' }
  ): Promise<BaseResponse> {
    const existedStatistic = await this.statisticService.findOne({
      where: { pokemonId: Number(actionPokemonStatisticDto.pokemonId) }
    });

    if (!existedStatistic) {
      await this.statisticService.insert({
        pokemonId: actionPokemonStatisticDto.pokemonId,
        pass: 0,
        smash: 0,
        [actionPokemonStatisticDto.action]: 1
      });

      return this.wrapSuccess();
    } else {
      await this.statisticService.save({
        ...existedStatistic,
        [actionPokemonStatisticDto.action]: existedStatistic[actionPokemonStatisticDto.action] + 1
      });

      return this.wrapSuccess();
    }
  }
}
