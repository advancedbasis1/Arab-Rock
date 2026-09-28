export default function FactCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 rounded-2xl border border-line bg-ink p-5">
      <span className="font-display text-[1.4rem] font-black text-gold">
        {value}
      </span>
      <span className="text-[13.5px] font-bold text-stone">{label}</span>
    </div>
  );
}
