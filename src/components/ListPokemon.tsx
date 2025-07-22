// src/components/ListPokemon.tsx
import { useEffect, useState, useRef } from 'react';
import { fetchPokemonList, type Pokemon } from '../lib/fetch';

const getInitialLimit = () => (window.innerWidth < 768 ? 8 : 24);

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(0);
  const [limit] = useState(getInitialLimit);
  const offset = page * limit;
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!hasFetchedRef.current || page > 0) {
      loadPokemons();
      hasFetchedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadPokemons = async () => {
    try {
      const newPokemons = await fetchPokemonList(limit, offset);
      setPokemons((prev) => {
        const existingNames = new Set(prev.map((p) => p.name));
        const filtered = newPokemons.filter((p) => !existingNames.has(p.name));
        return [...prev, ...filtered];
      });
    } catch (err) {
      console.error('Gagal memuat Pokémon:', err);
    }
  };

  return (
    <div className='px-4 py-8 mx-auto'>
      <h3 className='text-display-xs md:text-display-md font-bold mb-8'>
        Pokémon List
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            className='p-4 bg-neutral-25 rounded-2xl h-[330px] w-[361px] md:w-[288px] md:h-[384px] shadow  hover:shadow-lg transition border-1 border-neutral-300 md:p-6'
          >
            <div className='flex items-center justify-center relative'>
              <img src='./pokbg.png' className='w-[199px] h-[199px]' />
              <img
                src={pokemon.image}
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
              {Array.isArray(pokemon.types) &&
                pokemon.types?.map((typeObj) => (
                  <div
                    key={typeObj.type.name}
                    className='h-[32px]  px-2 py-0.5 bg-neutral-25  rounded-md border-neutral-300 flex border-1 justify-center text-neutral-900 text-sm font-medium'
                  >
                    {typeObj.type.name}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className='text-center mt-8'>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className='px-6 py-2 bg-neutral-25 text-neutral-900 border-neutral-300 border-1 h-[44px] w-[180px] rounded-full text-sm md:text-md font-semibold hover:bg-primary-400 md:h-[52px] md:w-[237px] hover:cursor-pointer hover:text-white transition ease-in-out duration-300'
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
