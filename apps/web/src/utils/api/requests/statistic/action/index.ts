import type { FetchesRequestConfig } from '@siberiacancode/fetches';

import type { ActionPokemonDto, BaseResponse } from '@/generated/api/indexю';

import { api } from '@/utils/api/instance';

export type PostStatisticActionParams = ActionPokemonDto;

export type PostStatisticActionRequestConfig = FetchesRequestConfig<PostStatisticActionParams>;

export const postStatisticAction = ({ config, params }: PostStatisticActionRequestConfig) =>
  api.post<BaseResponse>('statistic/action', params, config);
