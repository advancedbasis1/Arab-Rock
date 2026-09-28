import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // كل اللغات المدعومة بالموقع
  locales: ["ar", "en"],

  // اللغة الافتراضية
  defaultLocale: "ar",

  // ar بدون بادئة (/), en ببادئة (/en)
  localePrefix: {
    mode: "as-needed",
    prefixes: {
      en: "/en",
    },
  },
});

export type AppLocale = (typeof routing.locales)[number];
