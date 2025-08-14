from pydantic import BaseModel, EmailStr

class SignUpRequest(BaseModel):
    user_name: str
    user_email: EmailStr
    password: str

class SignInRequest(BaseModel):
    user_email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"