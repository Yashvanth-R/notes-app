from pydantic import BaseModel, EmailStr

class UserPublic(BaseModel):
    user_id: str
    user_name: str
    user_email: EmailStr