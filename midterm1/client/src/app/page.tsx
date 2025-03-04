'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import Tile from '@/components/tile'

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
    <div className="flex w-full items-center justify-center min-h-screen">
      <div className="flex w-1/2 flex-col items-center justify-center">
        {pokemon.map((pokemon) => (
          <Tile key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <div className="flex w-1/2">

      </div>
    </div>
  )
}

export default Home