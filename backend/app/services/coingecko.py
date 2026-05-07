import httpx

async def fetch_raw_coins():
    url = "https://api.coingecko.com/api/v3/coins/markets"
    params = {
        "vs_currency": "usd",
        "order": "market_cap_desc",
        "per_page": 250,
        "page": 1
    }
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.get(url, params=params)
        
        if response.status_code == 429:
            raise Exception("CoinGecko rate limit exceeded. Please wait before making more requests.")
        
        response.raise_for_status()
        return response.json()