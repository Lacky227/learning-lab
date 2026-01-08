from fastapi import APIRouter

router = APIRouter(
    prefix="/api/core",
    tags=["Core"]
)

@router.get("/health")
async def health_check():
    return {"status": "ok"}