import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import FactCard from "@/components/FactCard";
import ValueCard from "@/components/ValueCard";
import { ShieldIcon, ClockIcon, MapPinIcon, UsersIcon } from "@/components/icons";

const valueIcons = [ShieldIcon, ClockIcon, MapPinIcon, UsersIcon];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const facts = t.raw("facts") as { value: string; label: string }[];
  const values = t.raw("values") as { title: string; text: string }[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      <section className="py-14 sm:py-18">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col gap-5">
              <p className="max-w-[62ch] text-[16px] leading-relaxed text-paper-dim">
                {t("p1")}
              </p>
              <p className="max-w-[62ch] text-[16px] leading-relaxed text-paper-dim">
                {t("p2")}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-[14px] font-extrabold uppercase tracking-wide text-stone">
                {t("factsTitle")}
              </h2>
              <div className="grid grid-cols-2 gap-3.5">
                {facts.map((f) => (
                  <FactCard key={f.label} value={f.value} label={f.label} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-ink-2 py-14 sm:py-18">
        <Container>
          <h2 className="mb-8 text-[clamp(1.5rem,3vw,1.9rem)] font-extrabold text-paper">
            {t("valuesTitle")}
          </h2>
          <div className="grid grid-cols-1 gap-px overflow-clip rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <ValueCard
                  key={v.title}
                  icon={<Icon size={26} />}
                  title={v.title}
                  text={v.text}
                />
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
