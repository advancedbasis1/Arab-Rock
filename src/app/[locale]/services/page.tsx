import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import { PickaxeIcon, SupplyIcon, TruckIcon, MapPinIcon } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import { whatsappLink } from "@/config/site";

const serviceIcons = [PickaxeIcon, SupplyIcon, TruckIcon, MapPinIcon];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("title") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("services");
  const tNav = await getTranslations("nav");
  const items = t.raw("items") as {
    title: string;
    summary: string;
    details: string[];
  }[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      <section className="py-14 sm:py-18">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {items.map((item, i) => {
              const Icon = serviceIcons[i];
              return (
                <ServiceCard
                  key={item.title}
                  icon={<Icon size={22} />}
                  title={item.title}
                  summary={item.summary}
                  details={item.details}
                />
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-ink-2 py-14 sm:py-16">
        <Container>
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-[clamp(1.4rem,3vw,1.8rem)] font-extrabold text-paper">
              {t("ctaTitle")}
            </h2>
            <p className="max-w-[50ch] text-[15px] text-paper-dim">
              {t("ctaText")}
            </p>
            <div className="mt-1 flex flex-wrap justify-center gap-3.5">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener"
                className="rounded-[10px] bg-gold px-6 py-3 text-[14.5px] font-extrabold text-gold-ink transition hover:bg-gold-bright"
              >
                {t("ctaButton")}
              </a>
              <Link
                href="/contact"
                className="rounded-[10px] border border-line-strong px-6 py-3 text-[14.5px] font-extrabold text-paper transition hover:border-gold hover:text-gold"
              >
                {tNav("contact")}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
