from typing import Optional
from datetime import datetime, timezone
from uuid import uuid4

class Users:
    collection = "users"
    
    @staticmethod
    def create_user_document(user_name: str, user_email: str, password_hash: str) -> dict:
        now = datetime.now(tz=timezone.utc).isoformat()
        return {
            "user_id": str(uuid4()),
            "user_name": user_name,
            "user_email": user_email.lower(),
            "password": password_hash,
            "last_update": now,
            "create_on": now,
        }
    
    @staticmethod
    def get_public_user_data(user_doc: dict) -> dict:
        return {
            "user_id": user_doc["user_id"],
            "user_name": user_doc["user_name"],
            "user_email": user_doc["user_email"],
            "last_update": user_doc["last_update"],
            "create_on": user_doc["create_on"],
        }