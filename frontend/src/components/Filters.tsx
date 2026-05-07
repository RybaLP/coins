import { SortAsc, SortDesc } from "lucide-react";
// import { SearchInput } from "./SearchInput";
import { FdvSlider } from "./FdvSlider";

type SortField = "market_cap" | "volume_24h";
type SortDir = "asc" | "desc";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  fdvMax: number;
  onFdvMaxChange: (v: number) => void;
  sortField: SortField;
  sortDir: SortDir;
  onSort: (field: SortField) => void;
}

export function Filters({
  // search, onSearchChange,
  fdvMax, onFdvMaxChange,
  sortField, sortDir, onSort,
}: Props) {
  const SortIcon = sortDir === "desc" ? SortDesc : SortAsc;

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {/* <SearchInput value={search} onChange={onSearchChange} /> */}
      <FdvSlider value={fdvMax} onChange={onFdvMaxChange} />

      <button
        onClick={() => onSort("market_cap")}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border transition-colors ${
          sortField === "market_cap"
            ? "bg-indigo-600 border-indigo-500 text-white"
            : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
        }`}
      >
        {sortField === "market_cap" && <SortIcon size={14} />}
        Market Cap
      </button>

      <button
        onClick={() => onSort("volume_24h")}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border transition-colors ${
          sortField === "volume_24h"
            ? "bg-indigo-600 border-indigo-500 text-white"
            : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
        }`}
      >
        {sortField === "volume_24h" && <SortIcon size={14} />}
        Volume 24h
      </button>
    </div>
  );
}