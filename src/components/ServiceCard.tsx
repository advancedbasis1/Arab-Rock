import { ReactNode } from "react";

export default function ServiceCard({
  icon,
  title,
  summary,
  details,
}: {
  icon: ReactNode;
  title: string;
  summary: string;
  details?: string[];
}) {
  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-line bg-ink-2 p-6 transition hover:-translate-y-0.5 hover:border-gold/45 hover:bg-ink-3">
      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-[10px] bg-gold/12 text-gold">
        {icon}
      </div>
      <h3 className="text-[17px] font-extrabold text-paper">{title}</h3>
      <p className="text-[14.5px] leading-relaxed text-paper-dim">{summary}</p>
      {details && details.length > 0 && (
        <ul className="mt-1 flex flex-col gap-2 border-t border-line pt-4">
          {details.map((d) => (
            <li
              key={d}
              className="flex items-start gap-2 text-[13.5px] text-stone"
            >
              <span className="mt-2 h-1 w-1 flex-none rounded-full bg-gold" />
              {d}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
