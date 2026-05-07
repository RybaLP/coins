import type { Coin } from "../types/coin";

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

interface Props {
  coin: Coin;
}

export function CoinRow({ coin }: Props) {
  return (
    <tr className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
      <td className="px-4 py-3">
        <div className="font-medium text-white">{coin.name}</div>
        <div className="text-gray-500 text-xs uppercase">{coin.symbol}</div>
      </td>
      <td className="px-4 py-3 text-right text-gray-200">
        {fmt(coin.market_cap)}
      </td>
      <td className="px-4 py-3 text-right text-gray-200">
        {fmt(coin.fdv)}
      </td>
      <td className="px-4 py-3 text-right text-gray-200">
        {fmt(coin.volume_24h)}
      </td>
      <td className="px-4 py-3 text-right text-gray-200">
        {fmt(coin.tvl)}
      </td>
    </tr>
  );
}