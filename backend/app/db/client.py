from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

_client = None
_db = None

async def get_db():
    global _client, _db
    if _client is None:
        _client = AsyncIOMotorClient(settings.mongo_uri)
        _db = _client.get_default_database()
        if _db is None:
            _db = _client["notesdb"]
        # indexes
        await _db["users"].create_index("user_email", unique=True)
        await _db["notes"].create_index([("owner_id", 1), ("last_update", -1)])
    return _db