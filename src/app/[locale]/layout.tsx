import type { Metadata } from "next";
import { Cairo, Tajawal } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { localeAlternates } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  weight: ["600", "700", "800", "900"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "700", "900"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const alternates = localeAlternates(locale);
  const ogLocale = locale === "ar" ? "ar_SA" : "en_US";

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
      default: t("titleSuffix"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("description"),
    keywords: t("keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    alternates,
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: alternates.canonical,
      siteName: t("siteName"),
      title: t("titleSuffix"),
      description: t("description"),
      images: [{ url: "/hero-truck.jpg", width: 1894, height: 830, alt: t("siteName") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("titleSuffix"),
      description: t("description"),
      images: ["/hero-truck.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const dir = locale === "ar" ? "rtl" : "ltr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.siteUrl}/#organization`,
        name: siteConfig.name,
        alternateName: siteConfig.nameAr,
        url: siteConfig.siteUrl,
        logo: `${siteConfig.siteUrl}/logo-black.png`,
        image: `${siteConfig.siteUrl}/hero-truck.jpg`,
        email: siteConfig.email,
        telephone: `+${siteConfig.whatsappNumber}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Riyadh",
          addressCountry: "SA",
        },
        sameAs: [
          siteConfig.linkedinUrl,
          siteConfig.instagramUrl,
          siteConfig.xUrl,
          siteConfig.tiktokUrl,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.siteUrl}/#website`,
        name: siteConfig.name,
        alternateName: siteConfig.nameAr,
        url: siteConfig.siteUrl,
        publisher: { "@id": `${siteConfig.siteUrl}/#organization` },
        inLanguage: ["ar", "en"],
      },
    ],
  };

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${cairo.variable} ${tajawal.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink font-body text-paper">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
