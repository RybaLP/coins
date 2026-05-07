import type { Coin } from "../types/coin";

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

interface Props {
  coins: Coin[];
}

export function StatsBar({ coins }: Props) {
  const totalMcap = coins.reduce((acc, c) => acc + c.market_cap, 0);
  const totalVolume = coins.reduce((acc, c) => acc + c.volume_24h, 0);

  return (
    <div className="flex gap-6 mb-4 text-sm text-gray-400">
      <span>
        Results:{" "}
        <span className="text-white font-medium">{coins.length}</span>
      </span>
      <span>
        Total MCap:{" "}
        <span className="text-white font-medium">{fmt(totalMcap)}</span>
      </span>
      <span>
        Total Vol 24h:{" "}
        <span className="text-white font-medium">{fmt(totalVolume)}</span>
      </span>
    </div>
  );
}