import { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

export default function EmptyState({
  icon,
  title,
  text,
  buttonLabel,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  buttonLabel: string;
}) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-dashed border-line-strong bg-ink-2 px-6 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 text-gold">
        {icon}
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="text-[19px] font-extrabold text-paper">{title}</h3>
        <p className="max-w-md text-[14.5px] leading-relaxed text-stone">
          {text}
        </p>
      </div>
      <Link
        href="/contact"
        className="rounded-full bg-gold px-5 py-2.5 text-[14px] font-extrabold text-gold-ink transition hover:bg-gold-bright"
      >
        {buttonLabel}
      </Link>
    </div>
  );
}
