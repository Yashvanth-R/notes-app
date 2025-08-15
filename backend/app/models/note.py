from typing import Optional
from datetime import datetime, timezone
from uuid import uuid4

class Notes:
    collection = "notes"
    
    @staticmethod
    def create_note_document(note_title: str, note_content: str, owner_id: str) -> dict:
        now = datetime.now(tz=timezone.utc).isoformat()
        return {
            "note_id": str(uuid4()),
            "note_title": note_title,
            "note_content": note_content,
            "created_on": now,
            "last_update": now,
            "owner_id": owner_id,
        }
    
    @staticmethod
    def update_note_document(existing_note: dict, note_title: Optional[str] = None, note_content: Optional[str] = None) -> dict:
        updated_note = existing_note.copy()
        
        if note_title is not None:
            updated_note["note_title"] = note_title
        if note_content is not None:
            updated_note["note_content"] = note_content
            
        updated_note["last_update"] = datetime.now(tz=timezone.utc).isoformat()
        return updated_note
    
    @staticmethod
    def get_public_note_data(note_doc: dict) -> dict:
        return {
            "note_id": note_doc["note_id"],
            "note_title": note_doc["note_title"],
            "note_content": note_doc["note_content"],
            "created_on": note_doc["created_on"],
            "last_update": note_doc["last_update"],
        }