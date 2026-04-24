import { createFileRoute } from "@tanstack/react-router";
import { EvolutionChart } from "@/components/site/EvolutionChart";
import { statsGlobales } from "@/lib/data/signalements";
import { COMMUNES } from "@/lib/data/communes";
import { StatTile } from "@/components/site/StatTile";
import { Download } from "lucide-react";

export const Route = createFileRoute("/donnees")({
  head: () => ({
    meta: [
      { title: "Données ouvertes — Frelon asiatique Corrèze & Dordogne" },
      {
        name: "description",
        content:
          "Statistiques et données ouvertes sur le frelon asiatique en Corrèze (19) et Dordogne (24). Téléchargement CSV, JSON, GeoJSON.",
      },
      { property: "og:title", content: "Données ouvertes — Observatoire" },
      {
        property: "og:description",
        content: "Open data signalements et interventions 19/24.",
      },
    ],
  }),
  component: DonneesPage,
});

function DonneesPage() {
  const s = statsGlobales();
  return (
    <div className="container-edit py-12">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-hornet">
        · Open data
      </span>
      <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight">
        Données ouvertes
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        L'Observatoire publie l'ensemble de ses données sous licence ODbL. Les exports
        sont actualisés quotidiennement et utilisables par les communes, chercheurs et
        journalistes.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatTile label="Signalements" value={s.total} variant="default" />
        <StatTile label="Détruits" value={s.detruits} variant="success" />
        <StatTile label="Communes" value={s.communesImpactees} variant="ink" />
        <StatTile label="Top 10 suivies" value={COMMUNES.length} variant="alert" />
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EvolutionChart />
        </div>
        <div className="grid gap-3">
          {[
            { f: "CSV", t: "Signalements bruts", s: "412 Ko" },
            { f: "JSON", t: "Communes & stats", s: "188 Ko" },
            { f: "GeoJSON", t: "Pins géolocalisés", s: "624 Ko" },
            { f: "PDF", t: "Bilan annuel 2025", s: "2,1 Mo" },
          ].map((d) => (
            <a
              key={d.f}
              href="#"
              className="group flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-soft"
            >
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-hornet">
                  {d.f}
                </div>
                <div className="mt-1 font-medium">{d.t}</div>
                <div className="font-mono text-[10px] text-muted-foreground">{d.s}</div>
              </div>
              <Download className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
