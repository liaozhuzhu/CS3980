'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import Tile from '@/components/tile'
import Card from '@/components/card'

const Home = () => {
  const [pokemon, setPokemon] = useState<any[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://127.0.0.1:8000/pokemon");
        setPokemon(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex w-full items-center justify-start min-h-screen">
      <div className="flex w-1/2 flex-col items-center justify-center p-5">
        {pokemon.map((pokemon) => (
          <div className="flex flex-col items-center justify-center w-full">
            <Tile key={pokemon.id} pokemon={pokemon} setSelectedPokemon={setSelectedPokemon}/>
          </div>
        ))}
      </div>
      <div className="flex min-w-1/2 items-center justify-center fixed top-0 right-0 h-screen">
        {selectedPokemon && (
          <Card pokemon={selectedPokemon} />
        )}
      </div>
    </div>
  )
}

export default Home