import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { GUIDES } from "./index";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    const g = GUIDES.find((x) => x.slug === params.slug);
    if (!g) throw notFound();
    return { guide: g };
  },
  head: ({ loaderData }) => {
    const g = loaderData?.guide;
    if (!g) return { meta: [{ title: "Guide" }] };
    return {
      meta: [
        { title: `${g.titre} — Guide pratique` },
        { name: "description", content: g.chapo },
        { property: "og:title", content: g.titre },
        { property: "og:description", content: g.chapo },
      ],
    };
  },
  component: GuideDetail,
});

function GuideDetail() {
  const { guide } = Route.useLoaderData();
  return (
    <article className="container-edit max-w-3xl py-14">
      <Link
        to="/guides"
        className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
      >
        ← Tous les guides
      </Link>
      <div className="mt-6 font-mono text-[11px] uppercase tracking-wider text-hornet">
        Guide pratique · {guide.duree}
      </div>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">
        {guide.titre}
      </h1>
      <p className="mt-6 text-xl leading-relaxed text-muted-foreground">{guide.chapo}</p>

      <div className="mt-10 space-y-5 text-base leading-relaxed text-foreground">
        <p>
          Ce guide est régulièrement mis à jour avec le concours des GDSA Corrèze et
          Dordogne, ainsi que de la FREDON Nouvelle-Aquitaine. Les protocoles présentés ici
          correspondent aux pratiques validées sur les départements 19 et 24.
        </p>
        <h2 className="font-display text-2xl font-semibold">Points clés</h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>Identifier les éléments distinctifs en quelques secondes.</li>
          <li>Connaître les démarches à effectuer et les acteurs à mobiliser.</li>
          <li>Adopter les gestes adaptés selon votre situation (habitant, apiculteur).</li>
        </ul>
        <h2 className="font-display text-2xl font-semibold">Pour aller plus loin</h2>
        <p>
          Vous pouvez consulter la fiche officielle de la FREDON Nouvelle-Aquitaine ou
          contacter directement le GDSA de votre département. Les liens utiles sont mis à
          jour dans la rubrique{" "}
          <Link to="/donnees" className="link-editorial">données ouvertes</Link>.
        </p>
      </div>
    </article>
  );
}
