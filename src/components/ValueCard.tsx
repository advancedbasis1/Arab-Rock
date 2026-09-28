import { ReactNode } from "react";

export default function ValueCard({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex flex-col gap-3 bg-ink-2 p-6">
      <span className="text-gold">{icon}</span>
      <h3 className="text-[16px] font-extrabold text-paper">{title}</h3>
      <p className="text-[14px] leading-relaxed text-stone">{text}</p>
    </div>
  );
}
