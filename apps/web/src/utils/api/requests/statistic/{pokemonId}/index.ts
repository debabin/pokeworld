import type { FetchesRequestConfig } from '@siberiacancode/fetches';

import type { StatisticPokemonResponse } from '@/generated/api/indexю';

import { api } from '@/utils/api/instance';

export interface GetStatisticParams {
  pokemonId: number;
}

export type GetStatisticRequestConfig = FetchesRequestConfig<GetStatisticParams>;

export const getStatistic = ({ config, params }: GetStatisticRequestConfig) =>
  api.get<StatisticPokemonResponse>(`statistic/${params.pokemonId}`, config);
