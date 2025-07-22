import SearchInput from './SearchInput';
import { useEffect, useState } from 'react';
// import { fetchPokemonList } from '../lib/fetch';
import ListPokemon from './ListPokemon';
// import { type Pokemon } from '../lib/fetch';

export default function Home() {
  const [showBg, setShowBg] = useState(false);
  // const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  // const [page, setPage] = useState(0);
  // const getInitialLimit = () => (window.innerWidth < 768 ? 8 : 24);
  // const [limit] = useState(getInitialLimit);
  // const offset = page * limit;
  // const hasFetchedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const hasScrolled = window.scrollY > 0;

      setShowBg(hasScrolled);
    };
    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className='bg-primary-300 min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden '
        id='hero'
      >
        <div className="absolute inset-0 bg-[url('/public/grid-plus.svg')] bg-repeat opacity-30 z-0" />

        {showBg && (
          <div className='bg-white w-full top-0 z-90 h-[64px] md:h-[80px] fixed shadow-2xl hover:bg-primary-300' />
        )}

        {/* Logo Pokedex */}
        <div className='fixed top-5 flex gap-2 z-100 hover:w-full hover:h-[64px] hover:items-center hover:justify-center hover:bg-primary-300 hover:top-0 hover:md:h-[80px]'>
          <a href='#hero' className='hover:cursor-pointer '>
            <img
              src='/pokeball.png'
              alt='Logo'
              width={160}
              height={140}
              className='h-[28px] w-[113px] md:h-[40px] md:w-[150px] z-100'
            />
          </a>
        </div>

        {/* Logo Pokemon */}
        <img
          src='/pokemon-logo.png'
          alt='Pokemon Logo'
          width={180}
          height={80}
          className='h-[38px] w-[103px] md:h-[80px] md:w-[180px] absolute top-[128px] md:top-[130px] z-10'
        />

        {/* Headings */}
        <h2 className='text-display-sm md:text-display-2xl font-bold text-neutral-900  px-15 absolute top-[175px] md:top-[210px] md:px-70'>
          Discover the Most Powerful Pokémon in the Wild!
        </h2>
        <p className='text-sm text-neutral-800 mt-2 font-medium px-4 md:px-20 absolute top-[290px] md:top-[330px] md:text-md md:text-neutral-900'>
          Train, Battle, and Collect Your Favorites!
        </p>

        {/* Search bar */}
        <div className='flex items-center justify-center bg-white mt-38 rounded-full shadow-md px-4 py-2 w-full z-20 md:mt-54 md:h-[56px] md:w-[518px] gap-2'>
          <SearchInput />
        </div>

        {/* Bottom Pokémon */}
        <div className='relative top-[50px] flex justify-between w-full px-0 pb-4 md:-top-[70px]'>
          <img
            src='/charizard.png'
            alt='Charizard'
            width={147}
            height={147}
            className='md:h-[328px] md:w-[328px] md:-top-[40px] absolute top-5 left-0'
          />
          <img
            src='/pikachu.png'
            alt='Pikachu'
            width={147}
            height={147}
            className='md:h-[278px] md:w-[278px] absolute md:-top-[10px] right-0 top-5 '
          />
        </div>

        {/* bottom cloud */}
        <div className='absolute hidden md:block left-0 w-full overflow-hidden md:bottom-0 leading-[0]'>
          <img src='/cloud2.svg' alt='Cloud' className='w-full h-auto' />
        </div>
        <div className='absolute md:hidden  left-0 w-full overflow-hidden leading-[0] top-[555px] '>
          <img src='/cloud1.svg' alt='Cloud' className='w-full h-auto' />
        </div>
      </header>
      <div className='bg-white min-h-screen  px-6 relative overflow-hidden'>
        <ListPokemon />
      </div>

      {/* <div className='px-4 py-8 mx-auto'>
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
              {/* <div className='flex flex-wrap gap-2 mt-4'>
              {Array.isArray(pokemon.types) &&
                pokemon.types?.map((typeObj) => (
                  <div
                    key={typeObj.type.name}
                    className='h-[32px]  px-2 py-0.5 bg-neutral-25  rounded-md border-neutral-300 flex border-1 justify-center text-neutral-900 text-sm font-medium'
                  >
                    {typeObj.type.name}
                  </div>
                ))}
            </div> */}
      {/* <div className='flex flex-wrap gap-2 mt-4'>
                {pokemon.types &&
                  pokemon.types.map((item) => (
                    <div
                      key={item.type?.name}
                      className='h-[32px]  px-2 py-0.5 bg-neutral-25  rounded-md border-neutral-300 flex border-1 justify-center text-neutral-900 text-sm font-medium'
                    >
                      {item.type?.name}
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
        </div> */}
      {/* </div> */}
    </>
  );
}
