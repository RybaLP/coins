export interface Coin {
  id: string;
  symbol: string;
  name: string;
  market_cap: number;
  fdv: number;
  volume_24h: number;
  tvl: number;
  max_supply: number;
  total_supply: number;
  preview_listing: boolean;
}