import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const GUIDES = [
  {
    slug: "reconnaitre-frelon-asiatique-europeen",
    titre: "Reconnaître un frelon asiatique d'un frelon européen",
    chapo:
      "Confondre Vespa velutina et Vespa crabro conduit chaque année à des destructions inutiles. Les critères visuels qui permettent d'identifier l'espèce en moins de trente secondes.",
    duree: "4 min",
  },
  {
    slug: "que-faire-piqure-frelon-asiatique",
    titre: "Que faire en cas de piqûre de frelon asiatique",
    chapo:
      "Symptômes, gestes de premiers secours, signes d'alerte allergique et numéros à contacter en Corrèze et en Dordogne.",
    duree: "3 min",
  },
  {
    slug: "protocole-destruction-nid",
    titre: "Protocole de destruction d'un nid",
    chapo:
      "Comment se déroule une intervention par un désinsectiseur agréé : matériel, méthodes, durée, coût moyen et financement.",
    duree: "5 min",
  },
  {
    slug: "piegeage-printanier-correze",
    titre: "Piégeage printanier en Corrèze",
    chapo:
      "Modèles de pièges sélectifs, période optimale, zones prioritaires : le guide validé par la FREDON Nouvelle-Aquitaine.",
    duree: "6 min",
  },
  {
    slug: "proteger-ruches-dordogne",
    titre: "Protéger ses ruches en Dordogne",
    chapo:
      "Muselières, harpes électriques, piégeage de protection : panorama des dispositifs efficaces et conditions d'usage.",
    duree: "7 min",
  },
];

export const Route = createFileRoute("/guides/")({
  head: () => ({
    meta: [
      { title: "Guides pratiques — Frelon asiatique en Corrèze & Dordogne" },
      {
        name: "description",
        content:
          "Reconnaître, signaler, faire détruire, protéger ses ruches : tous les guides pratiques de l'Observatoire.",
      },
      { property: "og:title", content: "Guides pratiques — Observatoire" },
      {
        property: "og:description",
        content: "Identification, prévention, intervention.",
      },
    ],
  }),
  component: GuidesPage,
});

function GuidesPage() {
  return (
    <div className="container-edit py-12">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-hornet">
        · Ressources evergreen
      </span>
      <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight">
        Guides pratiques
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Conçus avec les apiculteurs des GDSA 19 et 24 et les techniciens FREDON, ces guides
        évergreens couvrent l'identification, la prévention et l'intervention.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {GUIDES.map((g) => (
          <Link
            key={g.slug}
            to="/guides/$slug"
            params={{ slug: g.slug }}
            className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-foreground/30 hover:shadow-card"
          >
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Guide · {g.duree}
            </div>
            <h2 className="mt-3 font-display text-2xl font-semibold leading-tight group-hover:underline group-hover:decoration-hornet group-hover:decoration-2 group-hover:underline-offset-4">
              {g.titre}
            </h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {g.chapo}
            </p>
            <div className="mt-6 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-foreground/70 group-hover:text-hornet">
              Lire le guide
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                strokeWidth={2.5}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export { GUIDES };
