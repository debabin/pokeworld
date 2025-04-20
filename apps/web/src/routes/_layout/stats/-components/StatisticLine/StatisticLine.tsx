import type { Statistic } from '@/generated/api/indexю';

import {
  PokemonStatisticLine,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui';
import { cn } from '@/lib/utils';

interface StatisticLineProps {
  statistic: Statistic;
}

export const StatisticLine = ({ statistic }: StatisticLineProps) => (
  <div className='col-span-5 flex gap-2 justify-center items-center'>
    <div className={cn(statistic.smash > statistic.pass && 'font-semibold', 'text-sm')}>
      {Math.round((statistic.smash / (statistic.pass + statistic.smash)) * 100)}%
    </div>

    <div className='w-full flex gap-1 max-w-[250px]'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            style={{
              width: `${(statistic.smash / (statistic.pass + statistic.smash)) * 100}%`
            }}
          >
            <PokemonStatisticLine action='smash' />
          </TooltipTrigger>
          <TooltipContent>smashes: {statistic.smash}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            style={{
              width: `${(statistic.pass / (statistic.pass + statistic.smash)) * 100}%`
            }}
          >
            <PokemonStatisticLine action='pass' />
          </TooltipTrigger>
          <TooltipContent>passes: {statistic.pass}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <div className={cn(!(statistic.smash > statistic.pass) && 'font-semibold', 'text-sm')}>
      {Math.round((statistic.pass / (statistic.pass + statistic.smash)) * 100)}%
    </div>
  </div>
);
