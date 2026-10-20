import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const paths = ["", "/about", "/services", "/projects", "/partners", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        ar: `${siteConfig.siteUrl}${path}`,
        en: `${siteConfig.siteUrl}/en${path}`,
      },
    },
  }));
}
