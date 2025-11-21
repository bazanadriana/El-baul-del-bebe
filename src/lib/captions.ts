import captions from "@/data/captions.json";

export function getAltFor(src: string, fallback = ""): string {
  const key = src.replace(/^.*\/assets\//, ""); // normalize
  // @ts-ignore
  return captions[key]?.alt || fallback;
}
