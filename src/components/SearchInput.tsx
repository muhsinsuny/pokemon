import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SearchInput = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

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
    <>
      <div className='relative w-full flex justify-between gap-4 px-2 mx-auto'>
        <div className='relative w-full'>
          <input
            type='text'
            placeholder='Search Pokémon'
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
          className='md:w-[40px] md:h-[40px] hover:cursor-pointer'
          onClick={() => navigate(`/search/${input.trim().toLowerCase()}`)}
        />
      </div>
    </>
  );
};

export default SearchInput;
