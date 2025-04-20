import { createLazyFileRoute } from '@tanstack/react-router';

import { PokemonStatistic, PokemonSwiper, Socials } from './-component';


const MainPage = () => (
  <div className='flex justify-center items-center'>
    <div className='flex gap-4 flex-col px-2 pt-10'>
      <PokemonSwiper />
      <PokemonStatistic />
      <Socials />
    </div>
  </div>
);

export const Route = createLazyFileRoute('/_layout/')({
  component: MainPage
});
