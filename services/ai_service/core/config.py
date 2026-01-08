from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DATABASE_URL: str

    @property
    def database_url(self) -> str:
        return self.DATABASE_URL

settings = Settings()