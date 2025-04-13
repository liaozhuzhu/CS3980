'use client'
import axios from 'axios'
import {useRouter} from 'next/navigation'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext';

const Create = () => {
    type Pokemon = {
        name: string;
        types: string;
        height: number | string;
        weight: number | string;
        moves: string[];
        hp: number | string;
    }

    const [newPokemon, setNewPokemon] = useState<Pokemon>({ name: "", types: "", height: "", weight: "", moves: [], hp: "" });
    const {user} = useAuth();
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewPokemon({ ...newPokemon, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPokemon.name || !newPokemon.types || !newPokemon.height || !newPokemon.weight || !newPokemon.moves || !newPokemon.hp) return;
    
        try {
            if (!user) {
                alert("User is not authenticated.");
                return;
            }
            const res = await axios.post("http://127.0.0.1:8000/pokemon", {...newPokemon, pid: Math.floor(51 + Math.random() * 1000), user: user.username}, {
                headers: { "Content-Type": "application/json" }
            });
            console.log(res.data);
            setNewPokemon({ name: "", types: "", height: "", weight: "", moves: [], hp: "" });
            router.push("/");
        } catch (error) {
            console.error("There was an error creating the Pokémon:", error);
            alert("Failed to create Pokémon.");
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="bg-black p-6 rounded-lg shadow-lg w-full sm:w-96 mt-10">
                <h2 className="text-2xl font-semibold text-center mb-6">Create Your Pokémon</h2>
                <div className="space-y-4">
                    <input 
                        type="text" 
                        name="name" 
                        value={newPokemon.name} 
                        onChange={handleInputChange}
                        placeholder="Name" 
                        className="w-full p-3 border border-gray-600 rounded-md bg-black text-white focus:outline-none" 
                    />
                    <input 
                        type="text" 
                        name="types" 
                        value={newPokemon.types} 
                        onChange={handleInputChange}
                        placeholder="Type" 
                        className="w-full p-3 border border-gray-600 rounded-md bg-black text-white focus:outline-none" 
                    />
                    <input 
                        type="number" 
                        name="height" 
                        value={newPokemon.height} 
                        onChange={handleInputChange}
                        placeholder="Height" 
                        className="w-full p-3 border border-gray-600 rounded-md bg-black text-white focus:outline-none" 
                    />
                    <input 
                        type="number" 
                        name="weight" 
                        value={newPokemon.weight} 
                        onChange={handleInputChange}
                        placeholder="Weight" 
                        className="w-full p-3 border border-gray-600 rounded-md bg-black text-white focus:outline-none" 
                    />
                    <input 
                        type="text" 
                        name="moves" 
                        value={newPokemon.moves.join(", ")} 
                        onChange={(e) => setNewPokemon({ ...newPokemon, moves: e.target.value.split(", ") })}
                        placeholder="Moves (comma separated)" 
                        className="w-full p-3 border border-gray-600 rounded-md bg-black text-white focus:outline-none" 
                    />
                    <input 
                        type="number" 
                        name="hp" 
                        value={newPokemon.hp} 
                        onChange={handleInputChange}
                        placeholder="HP" 
                        className="w-full p-3 border border-gray-600 rounded-md bg-black text-white focus:outline-none" 
                    />
                    <button 
                        onClick={handleSubmit}
                        className="w-full cursor-pointer py-3 bg-zinc-200 text-zinc-950 rounded-md hover:bg-zinc-100 focus:outline-none"
                    >
                        Create Pokémon
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Create;
