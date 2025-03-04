from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import random

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

global all_pokemon
all_pokemon = []


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/pokemon")
async def get_pokemon():
    response = requests.get("https://pokeapi.co/api/v2/pokemon?limit=50")
    pokemonNames = response.json()["results"]
    for pokemon in pokemonNames:
        pokemon_response = requests.get(pokemon["url"])
        pokemon_data = pokemon_response.json()
        all_pokemon.append(pokemon_data)
    return all_pokemon