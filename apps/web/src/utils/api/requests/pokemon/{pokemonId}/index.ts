import type { FetchesRequestConfig } from '@siberiacancode/fetches';

import type { PokemonResponse } from '@/generated/api/indexю';

import { api } from '@/utils/api/instance';

export interface GetPokemonParams {
  pokemonId: number | string;
}

export type GetPokemonRequestConfig = FetchesRequestConfig<GetPokemonParams>;

export const getPokemon = ({ config, params }: GetPokemonRequestConfig) =>
  api.get<PokemonResponse>(`pokemon/${params.pokemonId}`, config);
