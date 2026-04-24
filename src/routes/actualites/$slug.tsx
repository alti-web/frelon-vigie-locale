import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ACTUALITES } from "@/lib/data/actualites";
import { formatDateLong } from "@/lib/format";

export const Route = createFileRoute("/actualites/$slug")({
  loader: ({ params }) => {
    const a = ACTUALITES.find((x) => x.slug === params.slug);
    if (!a) throw notFound();
    return { actu: a };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.actu;
    if (!a) return { meta: [{ title: "Actualité" }] };
    return {
      meta: [
        { title: `${a.titre} — Observatoire` },
        { name: "description", content: a.chapo },
        { property: "og:title", content: a.titre },
        { property: "og:description", content: a.chapo },
      ],
    };
  },
  component: ActuDetail,
});

function ActuDetail() {
  const { actu } = Route.useLoaderData();
  return (
    <article className="container-edit max-w-3xl py-14">
      <Link
        to="/actualites"
        className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
      >
        ← Retour au fil
      </Link>
      <div className="mt-6 font-mono text-[11px] uppercase tracking-wider text-hornet">
        {actu.categorie} · {formatDateLong(actu.date)} · {actu.duree}
      </div>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">
        {actu.titre}
      </h1>
      <p className="mt-6 text-xl leading-relaxed text-muted-foreground">{actu.chapo}</p>
      <div className="mt-10 space-y-5 text-base leading-relaxed text-foreground">
        <p>
          Cette actualité est suivie en temps réel par l'Observatoire du Frelon Asiatique.
          Les éléments sont recoupés avec les données transmises par la FREDON
          Nouvelle-Aquitaine, le GDSA du département concerné et les services municipaux.
        </p>
        <p>
          Vous avez des informations complémentaires à transmettre ? Contactez l'équipe via
          le formulaire de signalement, en précisant la référence de cette actualité dans
          le champ commentaire.
        </p>
      </div>
    </article>
  );
}
