from pydantic import BaseModel
from typing import Optional

class NoteCreate(BaseModel):
    note_title: str
    note_content: str

class NoteUpdate(BaseModel):
    note_title: Optional[str] = None
    note_content: Optional[str] = None

class NotePublic(BaseModel):
    note_id: str
    note_title: str
    note_content: str
    created_on: str
    last_update: str