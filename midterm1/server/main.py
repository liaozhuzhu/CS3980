from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
import requests
import random
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

saved_pokemon = set()
cached_pokemon = []

class PokemonRequest(BaseModel):
    pokemon_id: int

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/pokemon")
async def get_pokemon():
    global cached_pokemon
    if not cached_pokemon:
        response = requests.get("https://pokeapi.co/api/v2/pokemon?limit=50")
        pokemonNames = response.json()["results"]
        all_pokemon = []
        for pokemon in pokemonNames:
            pokemon_response = requests.get(pokemon["url"])
            pokemon_data = pokemon_response.json()
            all_pokemon.append(pokemon_data)
        cached_pokemon = all_pokemon
        return all_pokemon
    else:
        return cached_pokemon

@app.post('/pokemon')
async def create_pokemon(pokemon: dict):
    global cached_pokemon
    cached_pokemon.append(pokemon)
    return pokemon

@app.put('/pokemon')
async def update_pokemon(pokemon: dict):
    global cached_pokemon
    for i, p in enumerate(cached_pokemon):
        if p['id'] == pokemon['id']:
            cached_pokemon[i] = pokemon
            return pokemon
    return {"error": "Pokemon not found"}

@app.post("/saved-pokemon")
async def save_pokemon(request: PokemonRequest):
    global saved_pokemon
    saved_pokemon.add(request.pokemon_id)
    return {"message": f"Pokemon with ID {request.pokemon_id} saved successfully!"}

@app.get("/saved-pokemon")
async def get_saved_pokemon():
    # return the saved pokemon names
    return list(saved_pokemon)

@app.delete("/saved-pokemon")
async def delete_saved_pokemon(request: PokemonRequest):
    global saved_pokemon
    saved_pokemon.remove(request.pokemon_id)
    return {"message": f"Pokemon with ID {request.pokemon_id} deleted successfully!"}
