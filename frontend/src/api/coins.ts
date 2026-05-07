import axios from "axios";
import type { Coin } from "../types/coin";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000",
});

export async function fetchFilteredCoins(): Promise<Coin[]> {
  const response = await api.get<Coin[]>("/coins/filtered");
  return response.data;
}