from pydantic import BaseModel
from typing import Optional


class CoinRaw(BaseModel):
    id: str
    symbol: Optional[str] = None
    name: Optional[str] = None

    market_cap: Optional[float] = None
    fully_diluted_valuation: Optional[float] = None
    total_volume: Optional[float] = None

    max_supply: Optional[float] = None
    total_supply: Optional[float] = None
    circulating_supply: Optional[float] = None

    current_price: Optional[float] = None

    preview_listing: Optional[bool] = None

    total_value_locked: Optional[float] = None

    class Config:
        extra = "allow" 


class CoinOut(BaseModel):
    id: str
    symbol: str
    name: str
    market_cap: float
    fdv: float
    volume_24h: float
    tvl: float
    max_supply: float
    total_supply: float
    preview_listing: bool