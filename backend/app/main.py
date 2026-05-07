from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.coins import router as coins_router

app = FastAPI(title="Crypto Filter Project")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,                  
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(coins_router)

@app.get("/")
async def root():
    return {"status": "API is running. Go to /coins/filtered"}