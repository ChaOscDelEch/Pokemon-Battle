'use client';
import { getPokemonList } from '@/lib/pokeapi';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    async function fetchData() {
      const data = await getPokemonList(10);
      console.log(data);
    }

    fetchData();
  }, []);


  
  return (
    <div>
      <h2 className='text-5xl font-bold mb-4 text-red-600'>
        Its Pokémon Time!
      </h2>
    </div>
  );
}