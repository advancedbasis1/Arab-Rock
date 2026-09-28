"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems, whatsappLink } from "@/config/site";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const tMeta = useTranslations("meta");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky z-50 border-b border-line bg-ink/90 backdrop-blur-md"
      style={{ top: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Logo siteName={tMeta("siteName")} />

        <nav className="hidden items-center gap-7 text-[15px] font-bold text-paper-dim lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`transition hover:text-paper ${
                  active ? "text-gold" : ""
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener"
            className="rounded-full bg-gold px-4.5 py-2 text-[14px] font-extrabold text-gold-ink transition hover:bg-gold-bright"
          >
            {t("cta")}
          </a>
        </div>

        <button
          className="flex items-center justify-center rounded-lg border border-line-strong p-2 text-paper lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-line px-5 pb-5 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1 text-[15px] font-bold text-paper-dim">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-2 py-2.5 transition hover:bg-ink-2 hover:text-paper ${
                    active ? "text-gold" : ""
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>
          <div className="mt-3 flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener"
              className="flex-1 rounded-full bg-gold px-4 py-2.5 text-center text-[14px] font-extrabold text-gold-ink"
            >
              {t("cta")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
