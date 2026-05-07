import type { Coin } from "../types/coin";
import { CoinRow } from "./CoinRow";

interface Props {
  coins: Coin[];
  isLoading: boolean;
  isError: boolean;
}

export function CoinTable({ coins, isLoading, isError }: Props) {
  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-400">
        Could not connect
      </div>
    );
  }

  if (coins.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No results found for the selected filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 border-b border-gray-800 bg-gray-900">
            <th className="text-left px-4 py-3">Projekt</th>
            <th className="text-right px-4 py-3">Market Cap</th>
            <th className="text-right px-4 py-3">FDV</th>
            <th className="text-right px-4 py-3">Volume 24h</th>
            <th className="text-right px-4 py-3">TVL</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <CoinRow key={coin.id} coin={coin} />
          ))}
        </tbody>
      </table>
    </div>
  );
}