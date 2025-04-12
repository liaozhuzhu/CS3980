'''
file to load default pokemon to mongodb
'''

import json
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)
db = client["mydb"]
collection = db["pokemon"]

result = collection.delete_many({})
print("Cleared existing 'pokemon' collection.")
with open("pokemon.json", "r") as file:
    data = json.load(file)

result = collection.insert_many(data)

print("Data inserted into 'pokemon' collection.")
