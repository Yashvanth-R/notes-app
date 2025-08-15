from fastapi import APIRouter, Depends, HTTPException, status
from app.db.client import get_db
from app.models.user import Users
from app.schemas.auth import SignUpRequest, SignInRequest, TokenResponse
from app.schemas.user import UserPublic
from app.core.security import get_password_hash, verify_password, create_access_token
from app.core.deps import get_current_user
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/signup", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
async def signup(payload: SignUpRequest, db=Depends(get_db)):
    try:
        existing_user = await db[Users.collection].find_one(
            {"user_email": payload.user_email.lower()}
        )
        
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        user_doc = Users.create_user_document(
            user_name=payload.user_name,
            user_email=payload.user_email,
            password_hash=get_password_hash(payload.password)
        )
        
        await db[Users.collection].insert_one(user_doc)
        
        logger.info(f"New user registered: {payload.user_email}")
        
        return Users.get_public_user_data(user_doc)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error during signup: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create account"
        )

@router.post("/signin", response_model=TokenResponse)
async def signin(payload: SignInRequest, db=Depends(get_db)):
    try:
        user = await db[Users.collection].find_one(
            {"user_email": payload.user_email.lower()}
        )
        
        if not user or not verify_password(payload.password, user.get("password", "")):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        access_token = create_access_token(user["user_id"])
        
        logger.info(f"User signed in: {payload.user_email}")
        
        return {
            "access_token": access_token,
            "token_type": "bearer"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error during signin: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Authentication failed"
        )

@router.get("/me", response_model=UserPublic)
async def get_current_user_info(user=Depends(get_current_user)):
    return Users.get_public_user_data(user)

@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(user=Depends(get_current_user)):
    try:
        access_token = create_access_token(user["user_id"])
        
        return {
            "access_token": access_token,
            "token_type": "bearer"
        }
        
    except Exception as e:
        logger.error(f"Error refreshing token: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to refresh token"
        )