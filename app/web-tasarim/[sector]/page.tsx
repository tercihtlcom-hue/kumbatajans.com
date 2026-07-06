import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectorStyleHub from "@/components/SectorStyleHub";
import { getWebDesignSite, webDesignSites } from "@/lib/webdesign-sites";

export function generateStaticParams() {
  return webDesignSites.map((s) => ({ sector: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sector: string }>;
}): Promise<Metadata> {
  const { sector: sectorSlug } = await params;
  const sector = getWebDesignSite(sectorSlug);
  if (!sector) return { title: "Web Tasarım | Kumbat Ajans®" };
  return {
    title: `${sector.tr.name} — Stil Seçimi | Kumbat Ajans®`,
    description: `${sector.tr.name} için web sitesi stil örnekleri.`,
  };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ sector: string }>;
}) {
  const { sector: sectorSlug } = await params;
  const sector = getWebDesignSite(sectorSlug);
  if (!sector) notFound();

  return <SectorStyleHub sector={sector} />;
}
