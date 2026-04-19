import { Fragment } from "react";
import { CitationBadge } from "@/components/CitationBadge";
import type { ResolvedCitation } from "@shared/schema";

const CITATION_REGEX =
  /\[((?:Ν\.\d+\/\d+|ΝΟΚ|ΚΕΝΑΚ|ΕΑΚ2000|ΓΟΚ)[^\]\s][^\]]*?)\]/g;

export function renderWithCitations(
  text: string,
  citations: ResolvedCitation[] | null | undefined
) {
  if (!text) return null;
  const citationMap = new Map<string, ResolvedCitation>();
  for (const c of citations ?? []) citationMap.set(c.citationKey, c);

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let i = 0;

  const matches = Array.from(text.matchAll(CITATION_REGEX));
  for (const match of matches) {
    const start = match.index ?? 0;
    const end = start + match[0].length;
    const key = match[1].trim();

    if (start > lastIndex) {
      nodes.push(
        <Fragment key={`t-${i}`}>{text.slice(lastIndex, start)}</Fragment>
      );
    }

    const resolved =
      citationMap.get(key) ?? { citationKey: key, verified: false };
    nodes.push(<CitationBadge key={`c-${i}`} citation={resolved} />);

    lastIndex = end;
    i++;
  }

  if (lastIndex < text.length) {
    nodes.push(<Fragment key={`t-end`}>{text.slice(lastIndex)}</Fragment>);
  }

  return nodes;
}
