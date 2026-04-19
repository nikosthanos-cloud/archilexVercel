import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, AlertTriangle, Loader2 } from "lucide-react";
import type { ResolvedCitation } from "@shared/schema";

interface LegalSourceDetail {
  citationKey: string;
  title: string;
  fullText: string;
  summary: string;
  officialUrl: string | null;
  fekReference: string | null;
  lawNumber: string | null;
  article: string | null;
  paragraph: string | null;
}

interface CitationBadgeProps {
  citation: ResolvedCitation;
}

export function CitationBadge({ citation }: CitationBadgeProps) {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<LegalSourceDetail | null>(null);
  const [loading, setLoading] = useState(false);

  async function openDetail() {
    if (!citation.verified) return;
    setOpen(true);
    if (detail) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/citations/${encodeURIComponent(citation.citationKey)}`,
        { credentials: "include" }
      );
      if (res.ok) {
        const data = await res.json();
        setDetail(data.source);
      }
    } finally {
      setLoading(false);
    }
  }

  if (!citation.verified) {
    return (
      <Badge
        variant="outline"
        className="mx-0.5 border-amber-500/50 text-amber-700 dark:text-amber-400 gap-1 font-normal text-[11px] align-baseline"
        data-testid="citation-unverified"
        title="Ανεπαλήθευτη αναφορά — δεν βρέθηκε στο μητρώο νομικών πηγών"
      >
        <AlertTriangle className="w-3 h-3" />
        {citation.citationKey}
      </Badge>
    );
  }

  return (
    <>
      <HoverCard openDelay={150} closeDelay={100}>
        <HoverCardTrigger asChild>
          <button
            type="button"
            onClick={openDetail}
            className="inline-flex items-baseline mx-0.5"
            data-testid="citation-verified"
          >
            <Badge
              variant="secondary"
              className="gap-1 font-normal text-[11px] cursor-pointer hover:bg-primary/15 hover:text-primary transition-colors"
            >
              <BookOpen className="w-3 h-3" />
              {citation.citationKey}
            </Badge>
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80" side="top" align="start">
          <div className="space-y-2">
            {citation.title && (
              <p className="text-sm font-semibold leading-tight">
                {citation.title}
              </p>
            )}
            {citation.summary && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {citation.summary}
              </p>
            )}
            {citation.fekReference && (
              <p className="text-[11px] text-muted-foreground">
                {citation.fekReference}
              </p>
            )}
            <Button
              size="sm"
              variant="outline"
              className="w-full gap-1 mt-1 h-7 text-xs"
              onClick={openDetail}
            >
              <BookOpen className="w-3 h-3" />
              Δείτε πλήρες κείμενο
            </Button>
          </div>
        </HoverCardContent>
      </HoverCard>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              {citation.citationKey}
            </DialogTitle>
            <DialogDescription>
              {detail?.title || citation.title}
            </DialogDescription>
          </DialogHeader>
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground py-6">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Φόρτωση...</span>
            </div>
          )}
          {detail && !loading && (
            <div className="space-y-4">
              {detail.fekReference && (
                <p className="text-xs text-muted-foreground">
                  {detail.fekReference}
                </p>
              )}
              <div className="rounded-md border border-border bg-muted/30 p-4">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {detail.fullText}
                </p>
              </div>
              {detail.officialUrl && (
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => window.open(detail.officialUrl!, "_blank")}
                >
                  <ExternalLink className="w-4 h-4" />
                  Άνοιγμα στην επίσημη πηγή
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
