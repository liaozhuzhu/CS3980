import { Trash } from "lucide-react";

const Tile = ({pokemon, setSelectedPokemon}: {pokemon: any, setSelectedPokemon: (pokemon: any) => void}) => {

    return (
        <div className="flex items-center justify-between outline cursor-pointer w-full h-full shadow-md" onClick={() => setSelectedPokemon(pokemon)}>
            <div className="flex items-center justify-start gap-5">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-24 h-24" />
                <div className='flex flex-col items-start justify-start'>
                    <h2 className="text-xl font-semibold capitalize">{pokemon.name}</h2>
                    <div className='flex gap-1'>
                        {pokemon.types.map((type: any) => (
                            <img key={type.type.name} src={`/images/${type.type.name}.png`} alt={type.type.name} className="w-4 h-4" />
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center gap-5">
                <Trash className="m-6"/>
            </div>
        </div>
    );
}

export default Tile;