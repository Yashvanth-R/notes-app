from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    mongo_uri: str
    jwt_secret: str
    jwt_expires_in: int
    cors_origins: str

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        
settings = Settings()
