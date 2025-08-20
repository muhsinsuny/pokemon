// SearchPage.tsx

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPokemonByName } from '../lib/fetch';
import { type Pokemon } from '../lib/fetch';

const SearchPage = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      navigate(`/search/${input.trim().toLowerCase()}`);
    }
  };

  const clearInput = () => {
    setInput('');
  };

  const handleInput = () => {
    const clearButton = document.getElementById('clearButton');
    if (input.trim() !== '') {
      clearButton?.classList.remove('hidden');
    } else {
      clearButton?.classList.add('hidden');
    }
  };

  return (
    <div className='bg-white mx-auto min-h-screen relative overflow-hidden'>
      <div className='flex items-center justify-center bg-white mt-5 h-[64px] px-6 py-2 w-full z-20  md:h-[56px] gap-2 shadow-2xl'>
        <div className='flex items-center justify-between mb-4 gap-2  w-full h-[64px]  '>
          <img
            src='/logo.png'
            alt='pokemon'
            width={28}
            height={28}
            className='md:hidden'
          />
          <img
            src='/pokeball.png'
            alt='pokemon'
            width={140}
            height={40}
            className='hidden md:block'
          />
          <div className='relative w-full h-[40px] flex items-center justify-between gap-4 px-2 mx-auto bg-neutral-100 rounded-full'>
            <div className='relative w-full'>
              <input
                type='text'
                placeholder={query}
                className='w-full p-2  text-neutral-900 border-none focus:outline-none focus:ring-2 focus:ring-secondary-300 focus:border-secondary-500'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onInput={handleInput}
                onFocus={handleInput}
              />
              <button
                id='clearButton'
                onClick={clearInput}
                className='absolute top-2 right-2 text-neutral-900 hover:text-black hidden hover:cursor-pointer'
              >
                ✕
              </button>
            </div>
            <img
              src='/search.png'
              alt=''
              width={28}
              height={28}
              className='md:w-[40px] md:h-[40px] h-[28px] hover:cursor-pointer'
              onClick={() => navigate(`/search/${input.trim().toLowerCase()}`)}
            />
          </div>
        </div>
      </div>
      <div className='bg-white min-h-screen px-6 relative overflow-hidden'>
        <h1 className='text-2xl text-neutral-900 font-bold mb-4'>
          {' '}
          Search Result for `{query}`
        </h1>
        {error && <p className='text-red-500'>{error}</p>}
        {pokemon && (
          <div className='p-4 bg-neutral-25 rounded-2xl h-[330px] w-[361px] md:w-[288px] md:h-[384px] shadow  hover:shadow-lg transition border-1 border-neutral-300 md:p-6'>
            <div className='flex items-center justify-center relative'>
              <img
                src='/pokbg.png'
                className='w-[199px] h-[199px]'
                alt='backpokemon'
              />
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className='w-[199px] h-[199px] mx-auto absolute'
              />
            </div>
            <p className='text-sm text-neutral-500 font-regular md:mt-4 md:text-md mt-0'>
              00{pokemon.id}
            </p>
            <p className='text-md md:text-xl text-neutral-900 capitalize font-semibold'>
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
        )}
      </div>
    </div>
  );
};

export default SearchPage;
