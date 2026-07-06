import { webDesignSites } from "../webdesign-sites";

type WebDict = {
  webdesign: { items: { name: string }[] };
  styles: Record<string, string>;
};

export function sectorNameFromDict(d: WebDict, slug: string, fallback: string) {
  const i = webDesignSites.findIndex((s) => s.slug === slug);
  return i >= 0 ? d.webdesign.items[i].name : fallback;
}

export function styleNameFromDict(d: WebDict, slug: string) {
  return d.styles[slug] ?? slug;
}
