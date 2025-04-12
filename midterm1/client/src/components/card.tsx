const Card = ({ pokemon, size }: { pokemon: any, size: 'small' | 'full' }) => {
  const types: string[] = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "fairy",
    "electric",
    "darkness",
    "ground",
    "psychic",
    "bug",
    "metal",
    "water",
    "fire",
    "grass",
    "lightning",
  ];

  const typeColorMap: { [key: string]: string } = {
    'normal': 'bg-gray-500',
    'fairy': 'bg-pink-500',
    'grass': 'bg-green-500',
    'fire': 'bg-red-500',
    'water': 'bg-blue-500',
    'electric': 'bg-yellow-500',
    'bug': 'bg-lime-500',
    'poison': 'bg-purple-500',
    'fighting': 'bg-orange-500',
    'flying': 'bg-sky-500',
    'psychic': 'bg-pink-500',
    'ground': 'bg-amber-700',
  };

  const pokemonType = Array.isArray(pokemon.types) ? pokemon.types[0].type.name : pokemon.types;
  const bgColorClass = typeColorMap[pokemonType.toLowerCase()] || 'bg-gray-500';

  if (pokemon.sprites) {
    return (
      <div className={`flex items-center flex-col ${bgColorClass} justify-start border-zinc-300 border border-10 rounded-xl shadow-md ${size === 'small' ? 'w-[250px] h-[350px]' : 'w-[350px] h-[500px]'} text-zinc-900`}>
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
            <p className="text-lg font-black leading-none">{pokemon.hp}</p>
            <img src={`/images/${pokemon.types[0].type.name}.png`} alt="type" className="w-5 h-5" />
          </div>
        </div>
        {/* image */}
        <div className="flex items-center flex-col justify-center w-11/12">
          <div className={`w-full ${size === "small" ? 'max-h-40' : 'max-h-50'} border border-3 border-zinc-200 rounded-tl rounded-tr flex items-center justify-center ${bgColorClass}`}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className={`${size === "small" ? 'w-40 h-40' : 'w-50 h-50'}`} />
          </div>
          <div className="flex items-center justify-center w-full border border-3 border-zinc-200 rounded-bl rounded-br bg-zinc-100 border-t-0">
            <p className="text-[8px] font-bold text-zinc-600">NO. {String(pokemon.pid).padStart(4, "0")} {pokemon.types[0].type.name[0].toUpperCase() + pokemon.types[0].type.name.slice(1)} Pokemon HT: {pokemon.height} WT: {pokemon.weight} lbs.</p>
          </div>
        </div>
        {/* moves */}
        <div className="flex items-center justify-center w-full h-full">
          <div className={`flex flex-col items-center justify-center ${size === "small" ? 'gap-2' : 'gap-5'} w-full h-full overflow-y-auto p-4`}>
            {/* randomly choose 2 moves */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-start w-10">
                {Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map((_, index) => (
                  <img
                    src={Math.round(Math.random() * 1) === 0 ? `/images/${pokemon.types[0].type.name}.png` : `/images/normal.png`}
                    alt="type"
                    className={`${size === "small" ? 'w-4 h-4' : 'w-5 h-5'}`}
                    key={index}
                  />
                ))}
              </div>
              <p className="text-sm font-bold capitalize ">{pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)].name}</p>
              <p className="text-sm font-bold">{Math.max(10, Math.round(Math.random() * (pokemon.hp - 10) / 10) * 10)}</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-start w-10">
                {Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map((_, index) => (
                  <img
                    src={Math.round(Math.random() * 1) === 0 ? `/images/${pokemon.types[0].type.name}.png` : `/images/normal.png`}
                    alt="type"
                    className={`${size === "small" ? 'w-4 h-4' : 'w-5 h-5'}`}
                    key={index}
                  />
                ))}
              </div>
              <p className="text-sm font-bold capitalize ">{pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)].name}</p>
              <p className="text-sm font-bold">{Math.max(10, Math.round(Math.random() * (pokemon.hp - 10) / 10) * 10)}</p>
            </div>
          </div>
        </div>
  
        {/* footer */}
        <div className={`flex justify-between items-center w-full ${size === "small" ? 'mb-24' : 'mb-5'} gap-4 p-3`}>
          <div className="flex items-center justify-center w-full bg-zinc-300 h-5 rounded-md">
            <p className={`text-[8px] font-black ${size==="small" ? 'mr-3' : 'mr-5'}`}>weakness</p>
            <img src={`/images/${types[Math.floor(Math.random() * types.length)]}.png`} alt="type" className="w-4 h-4" />
            <p className="font-bold text-sm">+20</p>
          </div>
          <div className="flex items-center justify-center w-full bg-zinc-300 h-5 rounded-md">
            <p className="text-[8px] font-black mr-5">retreat</p>
            <div className="flex items-center justify-center">
              {Array.from({ length: Math.floor(Math.random() * 2) + 1 }).map((_, index) => (
                <img
                  src={Math.round(Math.random() * 1) === 0 ? `/images/${pokemon.types[0].type.name}.png` : `/images/normal.png`}
                  alt="type"
                  className="w-4 h-4"
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );  
  }

  return (
    <div className={`flex items-center flex-col ${bgColorClass} justify-start border-zinc-300 border border-10 rounded-xl shadow-md ${size === 'small' ? 'w-[250px] h-[350px]' : 'w-[350px] h-[500px]'} text-zinc-900`}>
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
          <p className="text-lg font-black leading-none">{pokemon.hp}</p>
          <img src={`/images/${pokemon.types}.png`} alt="type" className="w-5 h-5" />
        </div>
      </div>
      {/* image */}
      <div className="flex items-center flex-col justify-center w-11/12">
        <div className={`w-full ${size === "small" ? 'max-h-40' : 'max-h-50'} border border-3 border-zinc-200 rounded-tl rounded-tr flex items-center justify-center ${bgColorClass}`}>
          <img src={`/images/${pokemon.types}.png`} alt={pokemon.name} className={`${size === "small" ? 'w-40 h-40' : 'w-50 h-50'}`} />
        </div>
        <div className="flex items-center justify-center w-full border border-3 border-zinc-200 rounded-bl rounded-br bg-zinc-100 border-t-0">
          <p className="text-[8px] font-bold text-zinc-600">NO. {String(pokemon.pid).padStart(4, "0")} {pokemon.types.slice(0, 1).toUpperCase() + pokemon.types.slice(1)} Pokemon HT: {
            pokemon.height} WT: {pokemon.weight} lbs.</p>
        </div>
      </div>
      {/* moves */}
      <div className="flex items-center justify-center w-full h-full">
        <div className={`flex flex-col items-center justify-center ${size === "small" ? 'gap-2' : 'gap-5'} w-full h-full overflow-y-auto p-4`}>
          {/* randomly choose 2 moves */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-start w-10">
              {Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map((_, index) => (
                <img
                  src={Math.round(Math.random() * 1) === 0 ? `/images/${pokemon.types}.png` : `/images/normal.png`}
                  alt="type"
                  className={`${size === "small" ? 'w-4 h-4' : 'w-5 h-5'}`}
                  key={index}
                />
              ))}
            </div>
            <p className="text-sm font-bold capitalize ">{pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)]}</p>
            <p className="text-sm font-bold">{Math.max(10, Math.round(Math.random() * (pokemon.hp - 10) / 10) * 10)}</p>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-start w-10">
              {Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map((_, index) => (
                <img
                  src={Math.round(Math.random() * 1) === 0 ? `/images/${pokemon.types}.png` : `/images/normal.png`}
                  alt="type"
                  className={`${size === "small" ? 'w-4 h-4' : 'w-5 h-5'}`}
                  key={index}
                />
              ))}
            </div>
            <p className="text-sm font-bold capitalize ">{pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)]}</p>
            <p className="text-sm font-bold">{Math.max(10, Math.round(Math.random() * (pokemon.hp - 10) / 10) * 10)}</p>
          </div>
        </div>
      </div>
        
      {/* footer */}
      <div className={`flex justify-between items-center w-full ${size === "small" ? 'mb-24' : 'mb-5'} gap-4 p-3`}>
        <div className="flex items-center justify-center w-full bg-zinc-300 h-5 rounded-md">
          <p className={`text-[8px] font-black ${size==="small" ? 'mr-3' : 'mr-5'}`}>weakness</p>
          <img src={`/images/${types[Math.floor(Math.random() * types.length)]}.png`} alt="type" className="w-4 h-4" />
          <p className="font-bold text-sm">+20</p>
        </div>
        <div className="flex items-center justify-center w-full bg-zinc-300 h-5 rounded-md">
          <p className="text-[8px] font-black mr-5">retreat</p>
          <div className="flex items-center justify-center">
            {Array.from({ length: Math.floor(Math.random() * 2) + 1 }).map((_, index) => (
              <img
                src={Math.round(Math.random() * 1) === 0 ? `/images/${pokemon.types}.png` : `/images/normal.png`}
                alt="type"
                className="w-4 h-4"
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Card;