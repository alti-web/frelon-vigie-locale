import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ACTUALITES } from "@/lib/data/actualites";
import { ACTU_CONTENT } from "@/lib/data/guides-content";
import { formatDateLong } from "@/lib/format";
import { NewsCard } from "@/components/site/NewsCard";

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
        { title: `${a.titre} — Observatoire du Frelon Asiatique` },
        { name: "description", content: a.chapo },
        { property: "og:title", content: a.titre },
        { property: "og:description", content: a.chapo },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-edit py-32 text-center">
      <h1 className="font-display text-4xl">Actualité introuvable</h1>
      <Link to="/actualites" className="mt-6 inline-block link-editorial">
        ← Retour au fil
      </Link>
    </div>
  ),
  component: ActuDetail,
});

function ActuDetail() {
  const { actu } = Route.useLoaderData();
  const corps = ACTU_CONTENT[actu.slug] ?? [];
  const autres = ACTUALITES.filter((a) => a.slug !== actu.slug).slice(0, 3);

  return (
    <article className="container-edit max-w-3xl py-14">
      <Link
        to="/actualites"
        className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
      >
        ← Retour au fil
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-hornet">
        <span>{actu.categorie}</span>
        <span className="text-border">·</span>
        <span className="text-muted-foreground">{formatDateLong(actu.date)}</span>
        <span className="text-border">·</span>
        <span className="text-muted-foreground">{actu.duree}</span>
        {actu.commune && (
          <>
            <span className="text-border">·</span>
            <span className="text-muted-foreground">{actu.commune}</span>
          </>
        )}
      </div>

      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">
        {actu.titre}
      </h1>
      <p className="mt-6 text-xl leading-relaxed text-muted-foreground">{actu.chapo}</p>

      <div className="mt-10 space-y-5 text-base leading-relaxed text-foreground">
        {corps.length > 0 ? (
          corps.map((p, i) => <p key={i}>{p}</p>)
        ) : (
          <p className="text-muted-foreground">
            Article en cours de rédaction par la rédaction de l'Observatoire.
          </p>
        )}
      </div>

      <aside className="mt-12 rounded-xl border border-border bg-paper p-5 text-sm">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Sources
        </div>
        <p className="mt-2 text-muted-foreground">
          Informations recoupées avec la FREDON Nouvelle-Aquitaine, le GDSA{" "}
          {actu.departement === "19" ? "Corrèze" : actu.departement === "24" ? "Dordogne" : "19/24"}, et
          les services municipaux concernés. Vous disposez d'éléments
          complémentaires&nbsp;?{" "}
          <Link to="/signaler-un-nid" className="link-editorial">
            Contactez-nous
          </Link>
          .
        </p>
      </aside>

      {actu.communeSlug && (
        <div className="mt-8 rounded-2xl border border-border bg-ink p-6 text-cream">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-hornet">
            · Suivre {actu.commune}
          </div>
          <p className="mt-3 text-cream/80">
            Tableau de bord, signalements et désinsectiseurs agréés sur la commune.
          </p>
          <Link
            to={
              actu.departement === "19"
                ? "/correze-19/$commune"
                : "/dordogne-24/$commune"
            }
            params={{ commune: actu.communeSlug }}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-hornet px-4 py-2.5 text-sm font-semibold text-hornet-foreground hover:bg-hornet/90"
          >
            Ouvrir la fiche {actu.commune} →
          </Link>
        </div>
      )}

      <div className="mt-14">
        <h2 className="font-display text-2xl font-semibold">À lire aussi</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {autres.map((a) => (
            <NewsCard key={a.slug} actu={a} compact />
          ))}
        </div>
      </div>
    </article>
  );
}
