from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings
import asyncio

_client = None
_db = None
_initialized = False

async def get_db():
    global _client, _db, _initialized
    if _client is None:
        print("Connecting to MongoDB...")
        _client = AsyncIOMotorClient(
            settings.mongo_uri,
            serverSelectionTimeoutMS=5000,  # 5 second timeout
            connectTimeoutMS=5000,
            maxPoolSize=10,
            minPoolSize=1
        )
        _db = _client.get_default_database()
        if _db is None:
            _db = _client["notesdb"]
        
        if not _initialized:
            try:
                print("Creating database indexes...")
                await _db["users"].create_index("user_email", unique=True, background=True)
                await _db["notes"].create_index([("owner_id", 1), ("last_update", -1)], background=True)
                _initialized = True
                print("Database connection established!")
            except Exception as e:
                print(f"Index creation warning: {e}")
    return _db

async def close_db():
    global _client
    if _client:
        _client.close()