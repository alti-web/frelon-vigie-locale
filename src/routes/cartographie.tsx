import { createFileRoute } from "@tanstack/react-router";
import { HornetMap } from "@/components/site/HornetMap";
import { SIGNALEMENTS, statsGlobales } from "@/lib/data/signalements";

export const Route = createFileRoute("/cartographie")({
  head: () => ({
    meta: [
      { title: "Cartographie du frelon asiatique — Corrèze & Dordogne" },
      {
        name: "description",
        content:
          "Carte interactive des signalements de nids de frelons asiatiques en Corrèze (19) et Dordogne (24). Filtrage par statut.",
      },
      { property: "og:title", content: "Cartographie — Observatoire du Frelon Asiatique" },
      {
        property: "og:description",
        content: "Carte temps réel des signalements sur les départements 19 et 24.",
      },
    ],
  }),
  component: CartoPage,
});

function CartoPage() {
  const stats = statsGlobales();
  return (
    <div className="container-edit py-12">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-hornet">
        · Cartographie temps réel
      </span>
      <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight">
        Carte des signalements
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        {stats.total} signalements géolocalisés sur les 90 derniers jours.
        Cliquez un pin pour le détail, filtrez par statut au-dessus de la carte.
      </p>
      <div className="mt-8">
        <HornetMap signalements={SIGNALEMENTS} height="640px" />
      </div>
    </div>
  );
}
