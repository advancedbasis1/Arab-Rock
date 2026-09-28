import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import MountainBackdrop from "@/components/MountainBackdrop";
import PeakArt from "@/components/PeakArt";
import ServiceCard from "@/components/ServiceCard";
import {
  PickaxeIcon,
  SupplyIcon,
  TruckIcon,
  MapPinIcon,
} from "@/components/icons";
import { whatsappLink } from "@/config/site";

const serviceIcons = [PickaxeIcon, SupplyIcon, TruckIcon, MapPinIcon];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tServices = await getTranslations("services");

  const tags = t.raw("tags") as string[];
  const cities = t.raw("coverageCities") as string[];
  const services = tServices.raw("items") as {
    title: string;
    summary: string;
  }[];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-clip py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 -z-10">
          <MountainBackdrop />
        </div>
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div className="flex max-w-xl flex-col gap-6">
              <Eyebrow>{t("eyebrow")}</Eyebrow>
              <h1 className="text-[clamp(2.1rem,5vw,3.3rem)] font-extrabold leading-[1.18] text-paper">
                {t("heroTitle")}{" "}
                <span className="text-gold">{t("heroTitleAccent")}</span>
              </h1>
              <p className="max-w-[52ch] text-[17px] leading-relaxed text-paper-dim">
                {t("heroLead")}
              </p>
              <div className="mt-1 flex flex-wrap gap-3.5">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener"
                  className="rounded-[10px] bg-gold px-6 py-3.5 text-[15px] font-extrabold text-gold-ink transition hover:-translate-y-0.5 hover:bg-gold-bright"
                >
                  {t("ctaWhatsapp")}
                </a>
                <Link
                  href="/services"
                  className="rounded-[10px] border border-line-strong px-6 py-3.5 text-[15px] font-extrabold text-paper transition hover:border-gold hover:text-gold"
                >
                  {t("ctaServices")}
                </Link>
              </div>
              <div className="mt-1 flex flex-wrap gap-2.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line px-3.5 py-1.5 text-[13px] font-bold text-stone"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto aspect-[520/430] w-full max-w-md lg:max-w-none">
              <PeakArt />
            </div>
          </div>
        </Container>
      </section>

      {/* ABOUT TEASER */}
      <section className="border-y border-line bg-ink-2 py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
            <div className="flex flex-col gap-4">
              <Eyebrow>{t("aboutEyebrow")}</Eyebrow>
              <h2 className="text-[clamp(1.6rem,3.2vw,2.2rem)] font-extrabold text-paper">
                {t("aboutTitle")}
              </h2>
              <p className="max-w-[58ch] text-[15.5px] leading-relaxed text-paper-dim">
                {t("aboutText")}
              </p>
              <Link
                href="/about"
                className="mt-1 flex w-fit items-center gap-1.5 text-[14.5px] font-extrabold text-gold transition hover:text-gold-bright"
              >
                {t("aboutLink")} ←
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* SERVICES TEASER */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mb-10 flex flex-col gap-3.5">
            <Eyebrow>{t("servicesEyebrow")}</Eyebrow>
            <h2 className="max-w-lg text-[clamp(1.6rem,3.2vw,2.2rem)] font-extrabold text-paper">
              {t("servicesTitle")}
            </h2>
            <p className="max-w-[56ch] text-[15.5px] text-paper-dim">
              {t("servicesLead")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => {
              const Icon = serviceIcons[i];
              return (
                <ServiceCard
                  key={s.title}
                  icon={<Icon size={22} />}
                  title={s.title}
                  summary={s.summary}
                />
              );
            })}
          </div>

          <Link
            href="/services"
            className="mt-8 flex w-fit items-center gap-1.5 text-[14.5px] font-extrabold text-gold transition hover:text-gold-bright"
          >
            {t("servicesLink")} ←
          </Link>
        </Container>
      </section>

      {/* COVERAGE */}
      <section className="py-6 sm:py-10">
        <Container>
          <div className="relative overflow-clip rounded-[20px] border border-line bg-gradient-to-br from-ink-2 via-[#242017] to-ink-2 px-6 py-13 text-center sm:px-14 sm:py-16">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
              <Eyebrow>{t("coverageEyebrow")}</Eyebrow>
              <h2 className="text-[clamp(1.5rem,3.4vw,2rem)] font-extrabold text-paper">
                {t("coverageTitle")}
              </h2>
              <p className="max-w-[52ch] text-[15.5px] text-paper-dim">
                {t("coverageText")}
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-2.5">
                <span className="rounded-full border border-gold bg-gold px-4 py-1.5 text-[13.5px] font-extrabold text-gold-ink">
                  {t("coverageHub")}
                </span>
                {cities.map((city) => (
                  <span
                    key={city}
                    className="rounded-full border border-line px-3.5 py-1.5 text-[13.5px] font-bold text-stone"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA BAND */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-[clamp(1.5rem,3.2vw,2rem)] font-extrabold text-paper">
              {t("ctaBandTitle")}
            </h2>
            <p className="max-w-[52ch] text-[15.5px] text-paper-dim">
              {t("ctaBandText")}
            </p>
            <Link
              href="/contact"
              className="mt-2 rounded-[10px] bg-gold px-7 py-3.5 text-[15px] font-extrabold text-gold-ink transition hover:-translate-y-0.5 hover:bg-gold-bright"
            >
              {t("ctaBandButton")}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
