from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import health, sync

app = FastAPI(
    title="MediScan Local API Service",
    description="Secure synchronization endpoints and clinical analytics gateway.",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(sync.router, prefix="/api", tags=["synchronization"])
