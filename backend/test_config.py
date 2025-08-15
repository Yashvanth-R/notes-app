import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

try:
    print("Testing configuration loading...")
    from app.core.config import settings
    
    print("Configuration loaded successfully!")
    print(f"MongoDB URI: {settings.mongo_uri[:50]}...")
    print(f"JWT Secret: {settings.jwt_secret[:20]}...")
    print(f"JWT Expires: {settings.jwt_expires_in}")
    print(f"CORS Origins: {settings.cors_origins}")
    print("\nTesting MongoDB connection...")
    import asyncio
    from app.db.client import get_db
    
    async def test_db():
        try:
            db = await get_db()
            await db.command("ping")
            print("MongoDB connection successful!")
            return True
        except Exception as e:
            print(f"MongoDB connection failed: {e}")
            return False
    
    success = asyncio.run(test_db())
    
    if success:
        print("\n Everything looks good! You can start the server now.")
    else:
        print("\n Check your MongoDB connection string.")
        
except Exception as e:
    print(f"Configuration error: {e}")
    print("\nTroubleshooting:")
    print("1. Check that backend/.env file exists")
    print("2. Verify MongoDB URI is correct")
    print("3. Ensure no special characters in .env file")