const Tile = ({pokemon, setSelectedPokemon}: {pokemon: any, setSelectedPokemon: (pokemon: any) => void}) => {

    if (pokemon.sprites) {
        return (
            <div className="flex items-center justify-between outline cursor-pointer w-full h-full shadow-md my-2" onClick={() => setSelectedPokemon(pokemon)}>
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
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between outline cursor-pointer w-full h-full shadow-md my-2" onClick={() => setSelectedPokemon(pokemon)}>
            <div className="flex items-center justify-start gap-5">
                <img src={`/images/${pokemon.types}.png`} alt={pokemon.name} className="w-24 h-24 p-6" />
                <div className='flex flex-col items-start justify-start'>
                    <h2 className="text-xl font-semibold capitalize">{pokemon.name}</h2>
                    <div className='flex gap-1'>
                        <img src={`/images/${pokemon.types}.png`} alt={pokemon.types} className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tile;