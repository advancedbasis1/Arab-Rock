import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { WhatsappIcon, MailIcon, MapPinIcon } from "@/components/icons";
import { whatsappLink, emailLink, siteConfig } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  const cards = [
    {
      icon: <WhatsappIcon size={20} />,
      label: t("infoWhatsappLabel"),
      value: siteConfig.whatsappDisplay,
      href: whatsappLink,
      dir: "ltr" as const,
    },
    {
      icon: <MailIcon size={20} />,
      label: t("infoEmailLabel"),
      value: siteConfig.email,
      href: emailLink,
      dir: undefined,
    },
    {
      icon: <MapPinIcon size={20} />,
      label: t("infoLocationLabel"),
      value: `${t("location")} ${t("coverageNote")}`,
      href: undefined,
      dir: undefined,
    },
  ];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      <section className="pb-16 sm:pb-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col gap-3.5">
              {cards.map((c) => {
                const content = (
                  <>
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[10px] bg-gold/12 text-gold">
                      {c.icon}
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[12.5px] font-bold text-stone">
                        {c.label}
                      </span>
                      <span
                        dir={c.dir}
                        className="text-[15px] font-extrabold text-paper"
                      >
                        {c.value}
                      </span>
                    </span>
                  </>
                );
                const cardClass =
                  "flex items-center gap-4 rounded-2xl border border-line bg-ink-2 px-5 py-4 transition hover:border-gold/45";

                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener" : undefined}
                    className={cardClass}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={c.label} className={cardClass}>
                    {content}
                  </div>
                );
              })}
            </div>

            <div className="rounded-2xl border border-line bg-ink-2 p-6 sm:p-8">
              <h2 className="mb-5 text-[18px] font-extrabold text-paper">
                {t("formTitle")}
              </h2>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
