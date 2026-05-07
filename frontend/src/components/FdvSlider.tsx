interface Props {
  value: number;
  onChange: (v: number) => void;
}

export function FdvSlider({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
      <span className="text-sm text-gray-400 whitespace-nowrap">FDV max</span>
      <input
        type="number"
        min={1}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-16 bg-transparent text-sm text-gray-100 focus:outline-none text-right"
      />
      <span className="text-sm text-gray-400">M$</span>
    </div>
  );
}