from typing import List
from app.schemas.coin import CoinRaw, CoinOut

def apply_crypto_filters(raw_coins: List[dict]) -> List[CoinOut]:
    filtered_output = []
    
    for coin_dict in raw_coins:
        try:
            coin = CoinRaw(**coin_dict)
            
            mcap = coin.market_cap or 0
            fdv = coin.fully_diluted_valuation or 0
            vol = coin.total_volume or 0
            total_s = coin.total_supply
            max_s = coin.max_supply
            tvl = coin.total_value_locked or 0
            
            preview = coin.preview_listing if coin.preview_listing is not None else True

            cond_mcap = mcap > 0
            
            cond_preview = preview is True
            
            cond_supply = max_s is not None and total_s is not None and max_s == total_s
            cond_fdv = fdv < 100_000_000
            
            cond_vol = vol > 50_000

            if all([cond_mcap, cond_preview, cond_supply, cond_fdv, cond_vol]):
                filtered_output.append(CoinOut(
                    id=coin.id,
                    symbol=(coin.symbol or "").upper(),
                    name=coin.name or "Unknown",
                    market_cap=float(mcap),
                    fdv=float(fdv),
                    volume_24h=float(vol),
                    tvl=float(tvl),
                    max_supply=float(max_s or 0),
                    total_supply=float(total_s or 0),
                    preview_listing=preview
                ))
                
        except Exception as e:
            print(f"Skipping record {coin_dict.get('id')}: {e}")
            continue
            
    return filtered_output