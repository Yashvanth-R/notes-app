from fastapi import APIRouter, Depends, HTTPException
from uuid import uuid4
from datetime import datetime, timezone
from app.core.deps import get_current_user
from app.db.client import get_db
from app.models.note import Notes
from app.schemas.note import NoteCreate

router = APIRouter()

@router.post("/")
async def create_note(data: NoteCreate, user=Depends(get_current_user)):
    db = get_db()
    now = datetime.now(tz=timezone.utc).isoformat()
    note = {
        "note_id": str(uuid4()),
        "note_title": data.note_title,
        "note_content": data.note_content,
        "created_on": now,
        "last_update": now,
        "owner_id": user["user_id"],
    }
    await db[Notes.collection].insert_one(note)
    return note

@router.get("/")
async def list_notes(user=Depends(get_current_user)):
    db = get_db()
    notes = await db[Notes.collection].find({"owner_id": user["user_id"]}).to_list(100)
    return notes