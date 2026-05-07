import { useQuery } from "@tanstack/react-query";
import { fetchFilteredCoins } from "../api/coins";

export function useCoins() {
  return useQuery({
    queryKey: ["coins"],
    queryFn: fetchFilteredCoins,
    staleTime: 1000 * 60 * 5, 
    retry: false,            
  });
}