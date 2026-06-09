from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
def read_health():
    return {"status": "healthy", "service": "mediscan-hub", "version": "2.0.0"}
