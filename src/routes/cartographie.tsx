import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { HornetMap } from "@/components/site/HornetMap";
import { listApprovedSignalements } from "@/lib/signalements.functions";
import { toSignalements } from "@/lib/signalements-mapper";

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
  const fetchPublic = useServerFn(listApprovedSignalements);
  const { data } = useQuery({
    queryKey: ["public-signalements"],
    queryFn: () => fetchPublic(),
  });
  const signalements = toSignalements(data?.items ?? []);

  return (
    <div className="container-edit py-12">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-hornet">
        · Cartographie temps réel
      </span>
      <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight">
        Carte des signalements
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        {signalements.length} signalements géolocalisés approuvés.
        Cliquez un pin pour le détail, filtrez par statut au-dessus de la carte.
      </p>
      <div className="mt-8">
        <HornetMap signalements={signalements} height="640px" />
      </div>
    </div>
  );
}
