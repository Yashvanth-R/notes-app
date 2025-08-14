from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routes import auth, notes
from app.db.client import get_db
from fastapi import status
from fastapi.responses import JSONResponse

app = FastAPI(title="Notes API (Starter)", version="0.1.0")

# CORS
origins = [o.strip() for o in settings.cors_origins.split(",") if o.strip()]
if not origins:
    origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    try:
        db = await get_db()
        await db.command("ping")
        return {"status": "ok", "db": "connected"}
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, content={"status": "error", "db": "disconnected", "detail": str(e)})

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(notes.router, prefix="/notes", tags=["notes"])