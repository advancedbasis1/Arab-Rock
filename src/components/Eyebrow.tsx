export default function Eyebrow({ children }: { children: string }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-[13px] font-bold text-gold before:h-1.5 before:w-1.5 before:flex-none before:rounded-full before:bg-gold">
      {children}
    </span>
  );
}
