import { useState, useMemo } from "react";
import { useCoins } from "./hooks/useCoins";
import { Filters } from "./components/Filters";
import { StatsBar } from "./components/StatsBar";
import { CoinTable } from "./components/CoinTable";
import type { Coin } from "./types/coin";

type SortField = "market_cap" | "volume_24h";
type SortDir = "asc" | "desc";

export default function App() {
  const { data, isLoading, isError } = useCoins();

  const [search, setSearch] = useState("");
  const [fdvMax, setFdvMax] = useState<number>(100);
  const [sortField, setSortField] = useState<SortField>("market_cap");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const filtered = useMemo<Coin[]>(() => {
    if (!data) return [];

    return [...data]
      .filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.symbol.toLowerCase().includes(search.toLowerCase())
      )
      .filter((c) => c.fdv < fdvMax * 1_000_000)
      .sort((a, b) =>
        sortDir === "desc"
          ? b[sortField] - a[sortField]
          : a[sortField] - b[sortField]
      );
  }, [data, search, fdvMax, sortField, sortDir]);

  function handleSort(field: SortField) {
    if (field === sortField) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-6 text-white">
        Crypto Filter
      </h1>

      <Filters
        search={search}
        onSearchChange={setSearch}
        fdvMax={fdvMax}
        onFdvMaxChange={setFdvMax}
        sortField={sortField}
        sortDir={sortDir}
        onSort={handleSort}
      />

      <StatsBar coins={filtered} />

      <CoinTable
        coins={filtered}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}