import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { navItems, whatsappLink, emailLink, siteConfig } from "@/config/site";
import { LinkedinIcon } from "./icons";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tMeta = useTranslations("meta");
  const tContact = useTranslations("contact");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1.3fr_0.7fr_0.9fr]">
          <div className="flex max-w-sm flex-col items-start gap-3.5">
            <Image
              src="/logo-white.png"
              alt={tMeta("siteName")}
              width={140}
              height={107}
              className="h-14 w-auto"
            />
            <p className="text-[14px] leading-relaxed text-stone">
              {t("description")}
            </p>
          </div>

          <div>
            <h4 className="mb-3.5 text-[14px] font-extrabold text-paper">
              {t("quickLinks")}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {navItems
                .filter((i) => i.key !== "home")
                .map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="text-[14px] text-stone transition hover:text-gold"
                    >
                      {tNav(item.key)}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3.5 text-[14px] font-extrabold text-paper">
              {t("contactTitle")}
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener"
                  className="text-[14px] text-stone transition hover:text-gold"
                >
                  <span dir="ltr">{siteConfig.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={emailLink}
                  className="text-[14px] text-stone transition hover:text-gold"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-[14px] text-stone">{tContact("location")}</li>
              <li>
                <a
                  href={siteConfig.linkedinUrl}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-1.5 text-[14px] text-stone transition hover:text-gold"
                >
                  <LinkedinIcon size={18} />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-9 border-t border-line pt-6 text-[13px] text-stone-dim">
          <span>
            © {year} {tMeta("siteName")}. {t("rights")}
          </span>
        </div>
      </div>
    </footer>
  );
}
