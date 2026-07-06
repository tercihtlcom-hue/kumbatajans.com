import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import WebTemplateShell from "@/components/WebTemplateShell";
import { getWebDesignSite, webDesignSites } from "@/lib/webdesign-sites";
import {
  getStyleDemoUrl,
  getWebDesignStyle,
  webDesignStyles,
} from "@/lib/webdesign-styles";

export function generateStaticParams() {
  return webDesignSites.flatMap((sector) =>
    webDesignStyles.map((style) => ({
      sector: sector.slug,
      style: style.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sector: string; style: string }>;
}): Promise<Metadata> {
  const { sector: sectorSlug, style: styleSlug } = await params;
  const sector = getWebDesignSite(sectorSlug);
  const style = getWebDesignStyle(styleSlug);
  if (!sector || !style) return { title: "Web Şablon | Kumbat Ajans®" };
  return {
    title: `${sector.tr.name} — ${style.tr.name} | Kumbat Ajans®`,
    description: `${sector.tr.name} için ${style.tr.name} stil şablonu.`,
  };
}

export default async function StyleTemplatePage({
  params,
}: {
  params: Promise<{ sector: string; style: string }>;
}) {
  const { sector: sectorSlug, style: styleSlug } = await params;
  const sector = getWebDesignSite(sectorSlug);
  const style = getWebDesignStyle(styleSlug);
  if (!sector || !style) notFound();

  const demoUrl = getStyleDemoUrl(sectorSlug, styleSlug);
  if (demoUrl) redirect(demoUrl);

  return <WebTemplateShell sector={sector} style={style} />;
}
