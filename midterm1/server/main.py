from fastapi import FastAPI, Body, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import requests
import random
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from pymongo import MongoClient
from jose import JWTError, jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
MONGO_URI = os.getenv("MONGO_URI")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
app = FastAPI()
client = MongoClient(MONGO_URI)
db = client["mydb"]
users_collection = db["users"]

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

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class User(BaseModel):
    username: str
    password: str

class PokemonRequest(BaseModel):
    pokemon_id: int

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/pokemon")
async def get_pokemon():
    try: 
        pokemon_collection = db["pokemon"]
        all_pokemon = list(pokemon_collection.find({}, {"_id": 0}))
        return all_pokemon
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

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

# User Auth
def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def hash_password(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta=None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/register")
def register(user: User):
    print("Registering user:", user.username)
    if users_collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="Username already taken")
    print(users_collection)
    users_collection.insert_one({
        "username": user.username,
        "hashed_password": hash_password(user.password)
    })
    return {"msg": "User registered successfully"}

@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users_collection.find_one({"username": form_data.username})
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": form_data.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/me")
def read_users_me(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return {"username": payload.get("sub")}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")