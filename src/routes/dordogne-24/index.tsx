import { createFileRoute } from "@tanstack/react-router";
import { DepartementPage } from "@/components/site/DepartementPage";

export const Route = createFileRoute("/dordogne-24/")({
  head: () => ({
    meta: [
      { title: "Frelon asiatique en Dordogne (24) — Observatoire départemental" },
      {
        name: "description",
        content:
          "Suivi du frelon asiatique en Dordogne : signalements, communes impactées, désinsectiseurs agréés et alertes apicoles sur le département 24.",
      },
      {
        property: "og:title",
        content: "Observatoire du frelon asiatique en Dordogne (24)",
      },
      {
        property: "og:description",
        content:
          "Tableau de bord départemental, cartographie des nids et fil d'actualités terrain pour la Dordogne.",
      },
    ],
  }),
  component: () => <DepartementPage code="24" />,
});
