import { useMemo } from 'react';

import type { PokemonStatistic } from '@/generated/api/indexю';

import {
  Card,
  PokemonCard,
  PokemonCardBackground,
  PokemonCardImage,
  PokemonCardTitle,
  PokemonCardTypes
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { getPokemonBackground } from '@/utils/helpers';

import { StatisticLine } from '../../../../-components';

interface StatisticWinnerPokemonProps {
  loading?: boolean;
  place: number;
  pokemon: PokemonStatistic;
}

const MEDALS = ['🥇', '🥈', '🥉'];

export const StatisticWinnerPokemon = ({
  pokemon,
  place,
  loading
}: StatisticWinnerPokemonProps) => {
  const pokemonBackground = useMemo(() => getPokemonBackground(pokemon.types[0]), [pokemon.id]);

  return (
    <div
      key={pokemon.id}
      className={cn('w-full flex flex-col gap-4', { 'animate-pulse': loading })}
    >
      <PokemonCard className='h-[100px] w-full' pokemon={pokemon}>
        <PokemonCardBackground src={`/backgrounds/bg-${pokemonBackground}.png`} />
        <PokemonCardImage className='min-h-32 min-w-32' />
      </PokemonCard>

      <Card className='w-full p-3 flex flex-col gap-2'>
        <PokemonCardTypes types={pokemon.types} />
        <div className='flex gap-2'>
          <span className='text-3xl'>{MEDALS[place - 1]}</span>
          <PokemonCardTitle className='text-3xl text-gray-900 capitalize'>
            {pokemon.name}
          </PokemonCardTitle>
        </div>
        {pokemon.statistic && <StatisticLine statistic={pokemon.statistic} />}
      </Card>
    </div>
  );
};
