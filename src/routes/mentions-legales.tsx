import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — Observatoire du Frelon Asiatique" },
      {
        name: "description",
        content:
          "Éditeur, hébergeur, directeur de publication et propriété intellectuelle de l'Observatoire du Frelon Asiatique 19/24.",
      },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: MentionsPage,
});

function MentionsPage() {
  return (
    <article className="container-edit max-w-3xl py-14">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-hornet">
        · Informations légales
      </span>
      <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight">
        Mentions légales
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Dernière mise à jour&nbsp;: 7 mai 2026
      </p>

      <div className="mt-10 space-y-8 leading-relaxed text-foreground/90">
        <Section titre="Éditeur du site">
          <p>
            <strong>Observatoire du Frelon Asiatique – Corrèze & Dordogne</strong><br />
            Association loi 1901 — N°&nbsp;W192005317<br />
            Maison de la Biodiversité, 19000 Tulle<br />
            Email&nbsp;: contact@observatoire-frelon.fr<br />
            Téléphone&nbsp;: 05 55 00 00 00
          </p>
        </Section>

        <Section titre="Directeur de publication">
          <p>
            La directrice de publication est la présidente en exercice de l'association,
            désignée par le conseil d'administration.
          </p>
        </Section>

        <Section titre="Hébergement">
          <p>
            Site hébergé par <strong>Lovable Cloud</strong> sur infrastructure Cloudflare
            (Workers + R2), répartie sur des serveurs européens conformes au RGPD.
          </p>
        </Section>

        <Section titre="Propriété intellectuelle">
          <p>
            Les contenus éditoriaux (articles, guides, illustrations) sont la propriété de
            l'association et publiés sous licence{" "}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr"
              target="_blank"
              rel="noreferrer"
              className="link-editorial"
            >
              Creative Commons BY-SA 4.0
            </a>
            . Les jeux de données sont publiés sous licence{" "}
            <a
              href="https://opendatacommons.org/licenses/odbl/"
              target="_blank"
              rel="noreferrer"
              className="link-editorial"
            >
              ODbL 1.0
            </a>
            . Toute réutilisation impose la mention <em>« Source : Observatoire du Frelon
            Asiatique 19/24 »</em>.
          </p>
        </Section>

        <Section titre="Crédits">
          <p>
            Cartographie&nbsp;: tuiles{" "}
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noreferrer"
              className="link-editorial"
            >
              © OpenStreetMap contributors
            </a>{" "}
            — moteur Leaflet. Typographies&nbsp;: Fraunces, Inter, JetBrains Mono (SIL Open
            Font License). Données démographiques&nbsp;: INSEE — millésime 2024.
          </p>
        </Section>

        <Section titre="Signalement de contenu">
          <p>
            Une erreur factuelle, une donnée obsolète ou un signalement litigieux&nbsp;?
            Écrivez à <strong>contact@observatoire-frelon.fr</strong>. Nous corrigeons sous
            72&nbsp;heures ouvrées.
          </p>
        </Section>
      </div>
    </article>
  );
}

function Section({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold tracking-tight">{titre}</h2>
      <div className="mt-3 text-base">{children}</div>
    </section>
  );
}
