from fastapi import APIRouter, Depends, HTTPException, Query, status
from typing import Optional
from app.core.deps import get_current_user
from app.db.client import get_db
from app.models.note import Notes
from app.schemas.note import NoteCreate, NoteUpdate, NoteResponse, NotesListResponse
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/", response_model=NoteResponse, status_code=status.HTTP_201_CREATED)
async def create_note(data: NoteCreate, user=Depends(get_current_user)):
    try:
        db = await get_db()

        note_doc = Notes.create_note_document(
            note_title=data.note_title,
            note_content=data.note_content,
            owner_id=user["user_id"]
        )
        
        await db[Notes.collection].insert_one(note_doc)
        
        return Notes.get_public_note_data(note_doc)
        
    except Exception as e:
        logger.error(f"Error creating note: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create note"
        )

@router.get("/", response_model=list[NoteResponse])
async def list_notes(
    q: str = Query("", description="Search query for notes"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(50, ge=1, le=100, description="Number of notes per page"),
    user=Depends(get_current_user)
):
    try:
        db = await get_db()
        
        filter_query = {"owner_id": user["user_id"]}
        
        if q.strip():
            filter_query["$or"] = [
                {"note_title": {"$regex": q, "$options": "i"}},
                {"note_content": {"$regex": q, "$options": "i"}}
            ]
        
        skip = (page - 1) * limit
        
        notes = await db[Notes.collection].find(
            filter_query,
            {"_id": 0} 
        ).sort("last_update", -1).skip(skip).limit(limit).to_list(limit)

        return [Notes.get_public_note_data(note) for note in notes]
        
    except Exception as e:
        logger.error(f"Error listing notes: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve notes"
        )

@router.get("/{note_id}", response_model=NoteResponse)
async def get_note(note_id: str, user=Depends(get_current_user)):
    try:
        db = await get_db()
        
        note = await db[Notes.collection].find_one({
            "note_id": note_id,
            "owner_id": user["user_id"]
        }, {"_id": 0})
        
        if not note:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Note not found"
            )
        
        return Notes.get_public_note_data(note)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting note {note_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve note"
        )

@router.put("/{note_id}", response_model=NoteResponse)
async def update_note(note_id: str, data: NoteUpdate, user=Depends(get_current_user)):
    try:
        db = await get_db()
        
        existing_note = await db[Notes.collection].find_one({
            "note_id": note_id,
            "owner_id": user["user_id"]
        }, {"_id": 0})
        
        if not existing_note:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Note not found"
            )
        
        updated_note = Notes.update_note_document(
            existing_note,
            note_title=data.note_title,
            note_content=data.note_content
        )

        await db[Notes.collection].update_one(
            {"note_id": note_id, "owner_id": user["user_id"]},
            {"$set": updated_note}
        )
        
        return Notes.get_public_note_data(updated_note)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating note {note_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update note"
        )

@router.delete("/{note_id}")
async def delete_note(note_id: str, user=Depends(get_current_user)):
    try:
        db = await get_db()
        
        result = await db[Notes.collection].delete_one({
            "note_id": note_id,
            "owner_id": user["user_id"]
        })
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Note not found"
            )
        
        return {"message": "Note deleted successfully", "note_id": note_id}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting note {note_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete note"
        )

@router.get("/stats/summary")
async def get_notes_stats(user=Depends(get_current_user)):
    try:
        db = await get_db()
        
        total_notes = await db[Notes.collection].count_documents({
            "owner_id": user["user_id"]
        })
        
        from datetime import datetime, timedelta
        seven_days_ago = (datetime.now() - timedelta(days=7)).isoformat()
        
        recent_notes = await db[Notes.collection].count_documents({
            "owner_id": user["user_id"],
            "created_on": {"$gte": seven_days_ago}
        })
        
        return {
            "total_notes": total_notes,
            "recent_notes": recent_notes,
            "user_id": user["user_id"]
        }
        
    except Exception as e:
        logger.error(f"Error getting notes stats: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve notes statistics"
        )