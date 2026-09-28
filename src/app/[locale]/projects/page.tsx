import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import EmptyState from "@/components/EmptyState";
import { FolderIcon } from "@/components/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return { title: t("title") };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("projects");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />
      <section className="py-14 sm:py-18">
        <Container>
          <EmptyState
            icon={<FolderIcon size={30} />}
            title={t("emptyTitle")}
            text={t("emptyText")}
            buttonLabel={t("emptyButton")}
          />
        </Container>
      </section>
    </>
  );
}
