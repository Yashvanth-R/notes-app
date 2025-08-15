from fastapi import APIRouter, Depends, HTTPException, Query
from uuid import uuid4
from datetime import datetime, timezone
from app.core.deps import get_current_user
from app.db.client import get_db
from app.models.note import Notes
from app.schemas.note import NoteCreate

router = APIRouter()

@router.post("/")
async def create_note(data: NoteCreate, user=Depends(get_current_user)):
    db = await get_db()
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
    
    # Return note without MongoDB's _id field
    note_response = {
        "note_id": note["note_id"],
        "note_title": note["note_title"],
        "note_content": note["note_content"],
        "created_on": note["created_on"],
        "last_update": note["last_update"]
    }
    return note_response

@router.get("/")
async def list_notes(q: str = Query(""), user=Depends(get_current_user)):
    db = await get_db()
    filter_query = {"owner_id": user["user_id"]}
    
    if q:
        filter_query["$or"] = [
            {"note_title": {"$regex": q, "$options": "i"}},
            {"note_content": {"$regex": q, "$options": "i"}}
        ]
    
    # Exclude MongoDB's _id field from the projection
    notes = await db[Notes.collection].find(
        filter_query, 
        {"_id": 0}  # Exclude _id field
    ).to_list(100)
    
    return notes

@router.delete("/{note_id}")
async def delete_note(note_id: str, user=Depends(get_current_user)):
    db = await get_db()
    result = await db[Notes.collection].delete_one({
        "note_id": note_id,
        "owner_id": user["user_id"]
    })
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Note not found")
    
    return {"message": "Note deleted successfully"}