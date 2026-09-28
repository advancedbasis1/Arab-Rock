import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // شمّل كل المسارات ما عدا API وملفات Next الداخلية والملفات الثابتة
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
