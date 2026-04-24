import { Link } from "@tanstack/react-router";
import type { Actualite } from "@/lib/data/actualites";
import { formatDateRelative } from "@/lib/format";
import { ArrowUpRight } from "lucide-react";

const CAT_COLORS: Record<Actualite["categorie"], string> = {
  intervention: "text-hornet border-hornet/30 bg-hornet/10",
  alerte: "text-alert border-alert/30 bg-alert/10",
  apiculture: "text-success border-success/30 bg-success/10",
  reglementation: "text-foreground border-border bg-muted",
  veille: "text-foreground border-border bg-muted",
};

const CAT_LABEL: Record<Actualite["categorie"], string> = {
  intervention: "Intervention",
  alerte: "Alerte",
  apiculture: "Apiculture",
  reglementation: "Réglementation",
  veille: "Veille",
};

export function NewsCard({ actu, compact = false }: { actu: Actualite; compact?: boolean }) {
  return (
    <article
      className={`group relative flex flex-col rounded-lg border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-card ${compact ? "" : "h-full"}`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`badge-status ${CAT_COLORS[actu.categorie]}`}
          style={{ background: undefined }}
        >
          {CAT_LABEL[actu.categorie]}
        </span>
        <time className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {formatDateRelative(actu.date)}
        </time>
      </div>

      <h3 className="mt-4 font-display text-xl font-semibold leading-tight text-foreground group-hover:underline group-hover:decoration-hornet group-hover:decoration-2 group-hover:underline-offset-4">
        {actu.titre}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{actu.chapo}</p>

      <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-xs">
        <div className="font-mono uppercase tracking-wider text-muted-foreground">
          {actu.commune ? `${actu.commune} · ${actu.duree}` : `${actu.duree} de lecture`}
        </div>
        <Link
          to="/actualites/$slug"
          params={{ slug: actu.slug }}
          className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground hover:text-hornet"
        >
          Lire <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          <span className="absolute inset-0" aria-label={actu.titre} />
        </Link>
      </div>
    </article>
  );
}
