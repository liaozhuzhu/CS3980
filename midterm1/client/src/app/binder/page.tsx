'use client'
import axios from 'axios'
import {useEffect, useState} from 'react'
import Card from '@/components/card'
import {Minus, Pencil, X} from 'lucide-react'
import {useRouter} from 'next/navigation'

const Binder = () => {
    type Pokemon = {
        name: string;
        types: string;
        height: number | string;
        weight: number | string;
        moves: string[];
        hp: number | string;
        id: number;
    }
    const [savedPokemon, setSavedPokemon] = useState<number[]>([]);
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [editPokemon, setEditPokemon] = useState<Pokemon | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const router = useRouter();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchSavedPokemon = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/saved-pokemon", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                setSavedPokemon(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching saved Pokemon:", error);
            }
        }
        if (token) {
            axios.get('http://localhost:8000/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
            }).then(res => {
            setUsername(res.data.username);
            }).catch(err => {
            console.error("Error fetching user data:", err);
            router.push("/login");
            });
        } else {
            router.push("/login");
        }
        fetchSavedPokemon();
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (editPokemon) {
            setEditPokemon({ ...editPokemon, [name]: value });
        }
    };

    const handleDelete = async (id:string) => {
        try {
            const res = await axios.delete("http://127.0.0.1:8000/saved-pokemon", {
                data: { pokemon_id: id },
                headers: { "Content-Type": "application/json" }
            });
            setSavedPokemon(prev => prev.filter(pokemon => pokemon !== Number(id)));
            setEditPokemon(null);
        } catch (error) {
            console.error("Error deleting Pokemon:", error);
        }
    }

    const handleEdit = async (id: number) => {
        try {
            const res = await axios.put(`http://127.0.0.1:8000/pokemon`, editPokemon, {
                headers: { "Content-Type": "application/json" },
            });
    
            // if (editPokemon) {
            //     setAllPokemon(prev =>
            //         prev.map(pokemon =>
            //             pokemon.id === id ? editPokemon : pokemon
            //         )
            //     );
            // }
            setEditPokemon(null);
        } catch (error) {
            console.error("Error editing Pokémon:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex w-full items-center justify-center h-[500px] flex-col">
                <img src="/images/loading.gif" alt="loading" className="w-30 h-30" />
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center w-full flex-col">
            {editPokemon && (
                <div className="min-h-screen w-full flex items-center justify-center bg-black text-white absolute z-50 top-0 left-0 w-full h-full bg-opacity-50">
                <button onClick={() => setEditPokemon(null)} className="z-[10000000000] absolute right-10 top-30 w-10 h-10 hover:bg-red-400 cursor-pointer transition duration-300 flex justify-center items-center rounded-full right-2">
                    <X size={30} />
                </button>
                <div className="bg-black p-6 rounded-lg shadow-lg w-full sm:w-96 mt-10">
                    <h2 className="text-2xl font-semibold text-center mb-6">Edit Your Pokémon</h2>
                    <div className="space-y-4">
                        <input 
                            type="text" 
                            name="name" 
                            value={editPokemon.name} 
                            onChange={handleInputChange}
                            placeholder="Name" 
                            className="w-full p-3 border border-gray-600 rounded-md bg-black text-white focus:outline-none" 
                        />
                        <input 
                            type="text" 
                            name="types" 
                            value={editPokemon.types} 
                            onChange={handleInputChange}
                            placeholder="Type" 
                            className="w-full p-3 border border-gray-600 rounded-md bg-black text-white focus:outline-none" 
                        />
                        <input 
                            type="number" 
                            name="height" 
                            value={editPokemon.height} 
                            onChange={handleInputChange}
                            placeholder="Height" 
                            className="w-full p-3 border border-gray-600 rounded-md bg-black text-white focus:outline-none" 
                        />
                        <input 
                            type="number" 
                            name="weight" 
                            value={editPokemon.weight} 
                            onChange={handleInputChange}
                            placeholder="Weight" 
                            className="w-full p-3 border border-gray-600 rounded-md bg-black text-white focus:outline-none" 
                        />
                        <input 
                            type="text" 
                            name="moves" 
                            value={editPokemon.moves.join(", ")} 
                            onChange={(e) => setEditPokemon({ ...editPokemon, moves: e.target.value.split(", ") })}
                            placeholder="Moves (comma separated)" 
                            className="w-full p-3 border border-gray-600 rounded-md bg-black text-white focus:outline-none" 
                        />
                        <input 
                            type="number" 
                            name="hp" 
                            value={editPokemon.hp} 
                            onChange={handleInputChange}
                            placeholder="HP" 
                            className="w-full p-3 border border-gray-600 rounded-md bg-black text-white focus:outline-none" 
                        />
                        <button 
                            onClick={() => handleEdit(editPokemon.id)}
                            className="w-full cursor-pointer py-3 bg-zinc-200 text-zinc-950 rounded-md hover:bg-zinc-100 focus:outline-none"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
            )}
            <div className="pt-28 w-full px-5">
                {username && <h1 className="text-xl text-zinc-50 z-50 font-bold">{username}'s Binder</h1>}
                {savedPokemon.length === 0 ? (
                    <div className="flex items-center justify-center w-full h-[500px]">
                        <p className="text-xl font-semibold">No saved Pokemon</p>
                    </div>
                ): (
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 items-start mt-10">
                    {savedPokemon.map((pokemon: any) => (
                        <div className="relative self-start" key={pokemon.id}>
                            <Card pokemon={pokemon} size="small"/>
                            <button className="absolute left-[-10px] top-[-10px] bg-red-500 w-6 h-6 hover:bg-red-400 cursor-pointer transition duration-300 flex justify-center items-center rounded-full right-2" onClick={() => handleDelete(pokemon.id)}>
                                <Minus size={20} />
                            </button>
                            {!pokemon.public && (
                                <button className="absolute right-[-10px] top-[-10px] bg-blue-500 w-6 h-6 hover:bg-blue-400 cursor-pointer transition duration-300 flex justify-center items-center rounded-full right-2" onClick={() => setEditPokemon(pokemon)}>
                                    <Pencil size={12} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                )}
            </div>
        </div>
    )
}

export default Binder