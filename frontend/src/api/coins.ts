import axios from "axios";
import type { Coin } from "../types/coin";

const api = axios.create({
  baseURL: "",
});

export async function fetchFilteredCoins(): Promise<Coin[]> {
  const response = await api.get<Coin[]>("/coins/filtered");
  return response.data;
}