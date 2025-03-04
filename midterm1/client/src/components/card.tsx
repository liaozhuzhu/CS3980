const Card = ({pokemon} : {pokemon: any}) => {
    return (
        <div className="flex items-center flex-col bg-gradient-to-br from-green-300 via-green-400 to-green-500 justify-start border-zinc-300 border border-10 rounded-xl shadow-md w-[350px] h-[500px] text-zinc-900">
            {/* header */}
            <div className="flex justify-between items-center w-full">
                <div className="flex gap-2 items-center justify-center ">
                    <div className="bg-gradient-to-r from-gray-200 via-zinc-100 rounded-md px-1 py-[2px] to-gray-200">
                        <p className="uppercase text-[6px] text-zinc-800 font-black italic">Basic</p>
                    </div>
                    <h2 className="capitalize font-bold">{pokemon.name}</h2>
                </div>
                <div className="flex items-end justify-center">
                    <p className="text-[8px] font-black">HP</p>
                    <p className="text-lg font-black leading-none">{pokemon.stats[0].base_stat}</p>
                    <img src={`/images/${pokemon.types[0].type.name}.png`} alt="type" className="w-5 h-5" />
                </div>
            </div>
            {/* image */}
            <div className="flex items-center flex-col justify-center w-11/12">
                <div className="w-full max-h-50 border border-3 border-zinc-200 rounded-tl rounded-tr flex items-center justify-center bg-green-500">
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-50 h-50" />
                </div>
                <div className="flex items-center justify-center w-full border border-3 border-zinc-200 rounded-bl rounded-br bg-zinc-100 border-t-0">
                    <p className="text-[8px] font-bold text-zinc-600">NO. {String(pokemon.id).padStart(4, "0")} {pokemon.types[0].type.name[0].toUpperCase() + pokemon.types[0].type.name.slice(1)} Pokemon HT: {pokemon.height} WT: {pokemon.weight} lbs.</p>
                </div>
            </div>
            {/* moves */}
            <div className="flex items-center justify-center w-full h-full">
                <div className="flex flex-col items-center justify-center gap-5 w-full h-full overflow-y-auto p-4">
                    {/* randomly choose 2 moves */}
                    <div className="flex items-center justify-between w-full">
                        <img src={Math.round(Math.random() * 1) === 0 ? `/images/${pokemon.types[0].type.name}.png` : `/images/normal.png`} alt="type" className="w-5 h-5" />
                        <p className="text-sm font-bold capitalize">{pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)].move.name}</p>
                        <p className="text-sm font-bold">{Math.max(10, Math.round(Math.random() * (pokemon.stats[0].base_stat - 10) / 10) * 10)}</p>                    
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <img src={Math.round(Math.random() * 1) === 0 ? `/images/${pokemon.types[0].type.name}.png` : `/images/normal.png`} alt="type" className="w-5 h-5" />
                        <p className="text-sm font-bold capitalize">{pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)].move.name}</p>
                        <p className="text-sm font-bold">{Math.max(10, Math.round(Math.random() * (pokemon.stats[0].base_stat - 10) / 10) * 10)}</p>                    
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Card;