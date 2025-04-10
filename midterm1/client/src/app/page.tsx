'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import Tile from '@/components/tile'
import Card from '@/components/card'
import { Download } from 'lucide-react'

const Home = () => {
  const [pokemon, setPokemon] = useState<any[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);  // State to control popup visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/pokemon");
        setPokemon(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [])

  const savePokemon = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/saved-pokemon",
        { pokemon_id: selectedPokemon.id }, 
        { headers: { "Content-Type": "application/json" } }
      );
      setShowPopup(true);  
      setTimeout(() => setShowPopup(false), 2000);  
    } catch (error) {
      console.error("Error saving Pokemon:", error);
    }
  }

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center h-[500px] flex-col">
        <img src="/images/loading.gif" alt="loading" className="w-30 h-30" />
      </div>
    )
  }

  return (
    <div className="flex w-full items-center justify-start min-h-screen">
      <div className="flex w-1/2 flex-col items-center justify-start p-5 h-[500px] overflow-y-scroll mt-10">
        {pokemon.map((pokemon) => (
          <div key={pokemon.id} className="flex flex-col items-center justify-center w-full">
            <Tile pokemon={pokemon} setSelectedPokemon={setSelectedPokemon}/>
          </div>
        ))}
      </div>
      <div className="flex min-w-1/2 items-center justify-center flex-col mt-10">
        {selectedPokemon ? (
          <div className="flex items-center justify-center w-full h-full gap-2">
            <button onClick={savePokemon} className="bg-green-500 rounded-lg text-zinc-800 font-bold p-2 cursor-pointer hover:bg-green-400">
              <Download />
            </button>
            <Card pokemon={selectedPokemon} size={"full"} />
          </div>
        ) : (
          <h1>Select a Pokemon</h1>
        )}
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg">
          Pokémon Saved!
        </div>
      )}
    </div>
  )
}

export default Home
