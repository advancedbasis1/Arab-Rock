"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale = routing.locales.find((l) => l !== locale)!;
  const label = otherLocale === "ar" ? "العربية" : "English";

  return (
    <button
      onClick={() => router.replace(pathname, { locale: otherLocale })}
      className="rounded-full border border-line-strong px-3.5 py-1.5 text-[13px] font-bold text-paper-dim transition hover:border-gold hover:text-gold"
      aria-label="Switch language"
    >
      {label}
    </button>
  );
}
