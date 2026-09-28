import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function Logo({ siteName }: { siteName: string }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <Image
        src="/logo-white.png"
        alt={siteName}
        width={140}
        height={107}
        className="h-14 w-auto"
        priority
      />
      <span className="font-display text-[17px] font-extrabold tracking-tight text-paper">
        Arab <span className="text-gold">Rock</span>
      </span>
    </Link>
  );
}
