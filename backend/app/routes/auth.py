from fastapi import APIRouter, Depends, HTTPException, status
from uuid import uuid4
from datetime import datetime, timezone
from app.db.client import get_db
from app.models.user import Users
from app.schemas.auth import SignUpRequest, SignInRequest, TokenResponse
from app.schemas.user import UserPublic
from app.core.security import get_password_hash, verify_password, create_access_token

router = APIRouter()

@router.post("/signup", response_model=UserPublic, status_code=201)
async def signup(payload: SignUpRequest, db=Depends(get_db)):
    now = datetime.now(tz=timezone.utc).isoformat()
    user = {
        "user_id": str(uuid4()),
        "user_name": payload.user_name,
        "user_email": payload.user_email.lower(),
        "password": get_password_hash(payload.password),
        "last_update": now,
        "create_on": now,
    }
    try:
        await db[Users.collection].insert_one(user)
    except Exception:
        raise HTTPException(status_code=400, detail="Email already exists")
    return {"user_id": user["user_id"], "user_name": user["user_name"], "user_email": user["user_email"]}

@router.post("/signin", response_model=TokenResponse)
async def signin(payload: SignInRequest, db=Depends(get_db)):
    user = await db[Users.collection].find_one({"user_email": payload.user_email.lower()})
    if not user or not verify_password(payload.password, user.get("password", "")):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token(user["user_id"])
    return {"access_token": token, "token_type": "bearer"}