import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/accessibilite")({
  head: () => ({
    meta: [
      { title: "Déclaration d'accessibilité — Observatoire Frelon Asiatique" },
      {
        name: "description",
        content:
          "Niveau de conformité RGAA, contenus dérogatoires et voies de recours pour l'accessibilité de l'Observatoire du Frelon Asiatique.",
      },
    ],
  }),
  component: AccessibilitePage,
});

function AccessibilitePage() {
  return (
    <article className="container-edit max-w-3xl py-14">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-hornet">
        · Engagement accessibilité
      </span>
      <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight">
        Déclaration d'accessibilité
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Établie le 7 mai 2026 — basée sur le RGAA 4.1
      </p>

      <div className="mt-10 space-y-8 leading-relaxed text-foreground/90">
        <p>
          L'Observatoire du Frelon Asiatique s'engage à rendre son site accessible
          conformément à l'article 47 de la loi n°&nbsp;2005-102 du 11 février 2005.
        </p>

        <section className="rounded-xl border border-border bg-paper p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            État de conformité
          </div>
          <p className="mt-2 text-lg">
            <strong>Partiellement conforme</strong> au RGAA 4.1 — taux de conformité estimé{" "}
            <span className="font-mono text-hornet">87&nbsp;%</span>.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Audit réalisé en interne le 28 avril 2026 sur 24 critères représentatifs.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">Contenus non accessibles</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-hornet">
            <li>
              La cartographie Leaflet n'est pas entièrement utilisable au clavier — une vue
              tabulaire alternative est proposée sur la page <Link to="/donnees" className="link-editorial">Données ouvertes</Link>.
            </li>
            <li>
              Les graphiques d'évolution (Recharts) ne disposent pas encore de description
              textuelle longue. Les données chiffrées sont reprises dans le tableau attenant.
            </li>
            <li>
              Certaines photographies de nids ne possèdent pas de texte alternatif
              descriptif détaillé — chantier en cours.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">Technologies utilisées</h2>
          <p className="mt-3">
            HTML5, CSS3, JavaScript (React 19), SVG, ARIA. Le site est testé sur Firefox,
            Chrome, Safari et Edge avec NVDA et VoiceOver.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">Retour & recours</h2>
          <p className="mt-3">
            Si vous constatez un défaut d'accessibilité, écrivez à{" "}
            <strong>accessibilite@observatoire-frelon.fr</strong>. Si vous n'obtenez pas de
            réponse satisfaisante, vous pouvez saisir le{" "}
            <a
              href="https://www.defenseurdesdroits.fr/"
              target="_blank"
              rel="noreferrer"
              className="link-editorial"
            >
              Défenseur des droits
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
