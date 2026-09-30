export const siteConfig = {
  name: "Arab Rock",
  nameAr: "عرب روك",
  domain: "arabrocks.com",
  email: "sales@arabrocks.com",
  whatsappNumber: "966500005617",
  whatsappDisplay: "+966 500 005 617",
  location: {
    ar: "الرياض، المملكة العربية السعودية",
    en: "Riyadh, Saudi Arabia",
  },
} as const;

export const whatsappLink = `https://wa.me/${siteConfig.whatsappNumber}`;
export const emailLink = `mailto:${siteConfig.email}`;

export const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "partners", href: "/partners" },
  { key: "contact", href: "/contact" },
] as const;
