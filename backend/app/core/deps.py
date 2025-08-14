from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from app.core.security import decode_token
from app.db.client import get_db
from app.models.user import Users

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/signin")

async def get_current_user(token: str = Depends(oauth2_scheme), db=Depends(get_db)):
    user_id = decode_token(token)
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    user = await db[Users.collection].find_one({"user_id": user_id})
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user