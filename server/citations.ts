import { storage } from "./storage";
import type { ResolvedCitation } from "@shared/schema";

const CITATION_REGEX =
  /\[((?:Ν\.\d+\/\d+|ΝΟΚ|ΚΕΝΑΚ|ΕΑΚ2000|ΓΟΚ)[^\]\s][^\]]*?)\]/g;

export function extractCitationKeys(text: string): string[] {
  const keys = new Set<string>();
  const matches = Array.from(text.matchAll(CITATION_REGEX));
  for (const match of matches) {
    keys.add(match[1].trim());
  }
  return Array.from(keys);
}

export async function resolveCitations(
  text: string
): Promise<ResolvedCitation[]> {
  const keys = extractCitationKeys(text);
  if (keys.length === 0) return [];

  const sources = await storage.getLegalSourcesByKeys(keys);
  const byKey = new Map(sources.map((s) => [s.citationKey, s]));

  return keys.map<ResolvedCitation>((key) => {
    const source = byKey.get(key);
    if (!source) return { citationKey: key, verified: false };
    return {
      citationKey: key,
      verified: true,
      title: source.title,
      summary: source.summary,
      officialUrl: source.officialUrl ?? undefined,
      fekReference: source.fekReference ?? undefined,
    };
  });
}
