from pydantic import BaseModel, Field
from typing import Optional

class NoteCreate(BaseModel):
    note_title: str = Field(..., min_length=1, max_length=200, description="Title of the note")
    note_content: str = Field(..., min_length=1, description="Content of the note")

class NoteUpdate(BaseModel):
    note_title: Optional[str] = Field(None, min_length=1, max_length=200, description="Updated title of the note")
    note_content: Optional[str] = Field(None, min_length=1, description="Updated content of the note")

class NotePublic(BaseModel):
    note_id: str
    note_title: str
    note_content: str
    created_on: str
    last_update: str

class NoteResponse(BaseModel):
    note_id: str
    note_title: str
    note_content: str
    created_on: str
    last_update: str
    
class NotesListResponse(BaseModel):
    notes: list[NoteResponse]
    total: int
    page: int
    limit: int