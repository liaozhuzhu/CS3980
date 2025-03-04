const Tile = ({pokemon}: {pokemon: any}) => {
    return (
        <div className="flex items-center justify-start outline cursor-pointer w-full h-full shadow-md gap-5">
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
    );
}

export default Tile;