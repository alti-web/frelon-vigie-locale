import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import { GUIDES } from "./index";
import { GUIDE_CONTENT, type Bloc } from "@/lib/data/guides-content";

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
        { title: `${g.titre} — Guide pratique Observatoire Frelon Asiatique` },
        { name: "description", content: g.chapo },
        { property: "og:title", content: g.titre },
        { property: "og:description", content: g.chapo },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-edit py-32 text-center">
      <h1 className="font-display text-4xl">Guide introuvable</h1>
      <Link to="/guides" className="mt-6 inline-block link-editorial">
        ← Tous les guides
      </Link>
    </div>
  ),
  component: GuideDetail,
});

function GuideDetail() {
  const { guide } = Route.useLoaderData();
  const blocs: Bloc[] = GUIDE_CONTENT[guide.slug] ?? [];
  const autres = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <article className="container-edit max-w-3xl py-14">
      <Link
        to="/guides"
        className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
      >
        ← Tous les guides
      </Link>
      <div className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-hornet">
        <span>Guide pratique</span>
        <span className="text-border">·</span>
        <Clock className="h-3 w-3" /> {guide.duree}
      </div>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">
        {guide.titre}
      </h1>
      <p className="mt-6 text-xl leading-relaxed text-muted-foreground">{guide.chapo}</p>

      <div className="mt-12 space-y-6">
        {blocs.map((b, i) => (
          <BlocRender key={i} b={b} />
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-border bg-paper p-6 text-sm">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Méthodologie
        </div>
        <p className="mt-2 text-muted-foreground">
          Ce guide est rédigé avec le concours des GDSA Corrèze et Dordogne et de la FREDON
          Nouvelle-Aquitaine. Il est révisé deux fois par an, en mars et en septembre.
          Dernière révision : avril 2026.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-2xl font-semibold">Poursuivre la lecture</h2>
        <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-card">
          {autres.map((g) => (
            <li key={g.slug}>
              <Link
                to="/guides/$slug"
                params={{ slug: g.slug }}
                className="group flex items-center justify-between gap-4 px-5 py-4 hover:bg-paper"
              >
                <div>
                  <div className="font-medium">{g.titre}</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {g.duree}
                  </div>
                </div>
                <ArrowRight
                  className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-hornet"
                  strokeWidth={2}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function BlocRender({ b }: { b: Bloc }) {
  if (b.type === "para")
    return <p className="text-base leading-relaxed text-foreground">{b.texte}</p>;
  if (b.type === "h2")
    return (
      <h2 className="mt-10 font-display text-2xl font-semibold tracking-tight">{b.texte}</h2>
    );
  if (b.type === "h3")
    return <h3 className="mt-6 font-display text-xl font-semibold">{b.texte}</h3>;
  if (b.type === "liste")
    return (
      <ul className="ml-1 list-disc space-y-2 pl-5 text-foreground/90 marker:text-hornet">
        {b.items.map((i, k) => (
          <li key={k} className="leading-relaxed">{i}</li>
        ))}
      </ul>
    );
  if (b.type === "ordered")
    return (
      <ol className="ml-1 list-decimal space-y-2 pl-5 text-foreground/90 marker:font-mono marker:text-hornet">
        {b.items.map((i, k) => (
          <li key={k} className="leading-relaxed">{i}</li>
        ))}
      </ol>
    );
  if (b.type === "encadre") {
    const tons: Record<string, string> = {
      info: "border-foreground/15 bg-paper",
      alerte: "border-alert/30 bg-alert/5",
      succes: "border-success/30 bg-success/5",
    };
    const ton = b.ton ?? "info";
    return (
      <aside className={`rounded-xl border p-5 ${tons[ton]}`}>
        <div
          className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
            ton === "alerte" ? "text-alert" : ton === "succes" ? "text-success" : "text-hornet"
          }`}
        >
          · {b.titre}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-foreground">{b.texte}</p>
      </aside>
    );
  }
  if (b.type === "citation")
    return (
      <blockquote className="border-l-2 border-hornet pl-5 italic text-foreground/80">
        « {b.texte} »
        <footer className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground not-italic">
          — {b.auteur}
        </footer>
      </blockquote>
    );
  return null;
}
