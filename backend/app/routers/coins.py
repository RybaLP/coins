from fastapi import APIRouter, HTTPException
from app.services.coingecko import fetch_raw_coins
from app.services.filter import apply_crypto_filters

router = APIRouter()

@router.get("/coins/filtered")
async def get_filtered_coins():
    try:
        raw_data = await fetch_raw_coins()
        result = apply_crypto_filters(raw_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))