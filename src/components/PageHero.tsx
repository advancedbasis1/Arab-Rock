import { ReactNode } from "react";
import Container from "./Container";
import Eyebrow from "./Eyebrow";
import MountainBackdrop from "./MountainBackdrop";

export default function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-clip py-16 sm:py-20">
      <div className="absolute inset-0 -z-10">
        <MountainBackdrop />
      </div>
      <Container>
        <div className="flex max-w-2xl flex-col gap-5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-[clamp(2rem,4.4vw,2.9rem)] font-extrabold leading-[1.15] text-paper">
            {title}
          </h1>
          {lead && (
            <p className="max-w-[54ch] text-[17px] leading-relaxed text-paper-dim">
              {lead}
            </p>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}
