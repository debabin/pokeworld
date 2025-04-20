import type { FetchesRequestConfig } from '@siberiacancode/fetches';

import type { StatisticControllerGetTopPokemonsParams, TopPokemonsResponse } from '@/generated/api/indexю';

import { api } from '@/utils/api/instance';

export type GetStatisticTopParams = StatisticControllerGetTopPokemonsParams;

export type GetStatisticTopRequestConfig = FetchesRequestConfig<GetStatisticTopParams>;

export const getStatisticTop = ({ config, params }: GetStatisticTopRequestConfig) =>
  api.get<TopPokemonsResponse>('statistic/top', {
    ...config,
    params: { ...params, ...config?.params }
  });
