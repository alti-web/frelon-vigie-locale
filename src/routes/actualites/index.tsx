import { createFileRoute } from "@tanstack/react-router";
import { ACTUALITES } from "@/lib/data/actualites";
import { NewsCard } from "@/components/site/NewsCard";

export const Route = createFileRoute("/actualites/")({
  head: () => ({
    meta: [
      { title: "Actualités — Frelon asiatique en Corrèze & Dordogne" },
      {
        name: "description",
        content:
          "Le fil d'actualités terrain : interventions, alertes apicoles et veille réglementaire sur les départements 19 et 24.",
      },
      { property: "og:title", content: "Actualités du frelon asiatique" },
      {
        property: "og:description",
        content: "Toutes les actualités terrain de l'Observatoire.",
      },
    ],
  }),
  component: ActusPage,
});

function ActusPage() {
  return (
    <div className="container-edit py-12">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-hornet">
        · Le fil
      </span>
      <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight">Actualités</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Interventions de désinsectiseurs, alertes apicoles, évolutions réglementaires :
        tout ce qui se passe sur le terrain en Corrèze et Dordogne.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {ACTUALITES.map((a) => (
          <NewsCard key={a.slug} actu={a} />
        ))}
      </div>
    </div>
  );
}
