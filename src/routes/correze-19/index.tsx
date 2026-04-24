import { createFileRoute } from "@tanstack/react-router";
import { DepartementPage } from "@/components/site/DepartementPage";

export const Route = createFileRoute("/correze-19/")({
  head: () => ({
    meta: [
      { title: "Frelon asiatique en Corrèze (19) — Observatoire départemental" },
      {
        name: "description",
        content:
          "Suivi du frelon asiatique en Corrèze : signalements, communes impactées, désinsectiseurs agréés et alertes apicoles sur le département 19.",
      },
      {
        property: "og:title",
        content: "Observatoire du frelon asiatique en Corrèze (19)",
      },
      {
        property: "og:description",
        content:
          "Tableau de bord départemental, cartographie des nids et fil d'actualités terrain pour la Corrèze.",
      },
    ],
  }),
  component: () => <DepartementPage code="19" />,
});
