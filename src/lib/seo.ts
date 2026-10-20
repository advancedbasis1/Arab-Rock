import { siteConfig } from "@/config/site";

/**
 * Builds canonical + hreflang alternates for a route, respecting the
 * site's locale-prefix scheme (ar has no prefix, en is prefixed with /en).
 * `path` is locale-agnostic, e.g. "" for home or "/about".
 */
export function localeAlternates(locale: string, path: string = "") {
  const arUrl = `${siteConfig.siteUrl}${path}`;
  const enUrl = `${siteConfig.siteUrl}/en${path}`;

  return {
    canonical: locale === "en" ? enUrl : arUrl,
    languages: {
      ar: arUrl,
      en: enUrl,
      "x-default": arUrl,
    },
  };
}
