import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { CommunePage } from "@/components/site/CommunePage";
import { getCommune } from "@/lib/data/communes";

export const Route = createFileRoute("/dordogne-24/$commune")({
  loader: ({ params }) => {
    const c = getCommune(params.commune);
    if (!c || c.departement !== "24") throw notFound();
    return { commune: c };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.commune;
    if (!c) return { meta: [{ title: "Commune introuvable" }] };
    return {
      meta: [
        {
          title: `Frelon asiatique à ${c.nom} (${c.codePostal}) — Observatoire local`,
        },
        {
          name: "description",
          content: `${c.signalements12mois} signalements et ${c.nidsDetruits} nids détruits à ${c.nom} sur les 12 derniers mois. Procédure, désinsectiseurs et données locales.`,
        },
        {
          property: "og:title",
          content: `Frelon asiatique à ${c.nom} — Observatoire`,
        },
        {
          property: "og:description",
          content: `Tableau de bord et signalements pour la commune de ${c.nom} (Dordogne).`,
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-edit py-32 text-center">
      <h1 className="font-display text-4xl">Commune non répertoriée</h1>
      <p className="mt-4 text-muted-foreground">
        Cette commune n'est pas encore suivie en détail. Revenez sur le département.
      </p>
      <Link
        to="/dordogne-24"
        className="mt-6 inline-block rounded-md bg-hornet px-4 py-2 font-semibold text-hornet-foreground"
      >
        Retour Dordogne
      </Link>
    </div>
  ),
  component: CommuneRoute,
});

function CommuneRoute() {
  const { commune } = Route.useLoaderData();
  return <CommunePage slug={commune.slug} />;
}
