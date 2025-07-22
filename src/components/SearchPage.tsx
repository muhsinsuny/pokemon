import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPokemonByName } from '../lib/fetch';
import { type Pokemon } from '../lib/fetch';

const SearchPage = () => {
  const { query } = useParams<{ query: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>();
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        setError('');
        const data = await fetchPokemonByName(query || '');
        setPokemon(data);
      } catch {
        setError('Pokémon not found');
        setPokemon(null);
      }
    };
    fetch();
  }, [query]);

  return (
    <div className=' mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'> Search Result for `{query}`</h1>
      {error && <p className='text-red-500'>{error}</p>}
      {pokemon && (
        <div
          // key={pokemon.name}
          className='p-4 bg-neutral-25 rounded-2xl h-[330px] w-[361px] md:w-[288px] md:h-[384px] shadow  hover:shadow-lg transition border-1 border-neutral-300 md:p-6'
        >
          <div className='flex items-center justify-center relative'>
            <img src='./pokbg.png' className='w-[199px] h-[199px]' />
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              className='w-[199px] h-[199px] mx-auto absolute'
            />
          </div>
          <p className='text-sm text-neutral-500 font-regular md:mt-4 md:text-md mt-0'>
            00{pokemon.id}
          </p>
          <p className='text-md md:text-xl capitalize font-semibold'>
            {pokemon.name}
          </p>
          <div className='flex flex-wrap gap-2 mt-4'>
            {pokemon.types &&
              pokemon.types.map((item) => (
                <div
                  key={item.type.name}
                  className='h-[32px]  px-2 py-0.5 bg-neutral-25  rounded-md border-neutral-300 flex border-1 justify-center text-neutral-900 text-sm font-medium'
                >
                  {item.type.name}
                </div>
              ))}
          </div>
        </div>

        // <div className='bg-white p-4 rounded shadow text-center'>
        //   <img
        //     src={pokemon.sprites.other['official-artwork'].front_default}
        //     alt={pokemon.name}
        //     className='w-32 h-32 mx-auto'
        //   />
        //   <p className='text-sm text-gray-500'>#{pokemon.id}</p>
        //   <p className='capitalize font-semibold text-xl'>{pokemon.name}</p>
        // </div>
      )}
    </div>
  );
};

export default SearchPage;
