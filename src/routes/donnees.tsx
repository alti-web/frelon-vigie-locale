import { createFileRoute, Link } from "@tanstack/react-router";
import { Database, Download, FileCode, Scale } from "lucide-react";
import { EvolutionChart } from "@/components/site/EvolutionChart";
import { statsGlobales } from "@/lib/data/signalements";
import { COMMUNES, DEPARTEMENTS } from "@/lib/data/communes";
import { StatTile } from "@/components/site/StatTile";
import { formatNombre } from "@/lib/format";

export const Route = createFileRoute("/donnees")({
  head: () => ({
    meta: [
      { title: "Données ouvertes — Frelon asiatique Corrèze & Dordogne | Observatoire" },
      {
        name: "description",
        content:
          "Téléchargez les données ouvertes (CSV, JSON, GeoJSON) de l'Observatoire du Frelon Asiatique pour la Corrèze (19) et la Dordogne (24). Licence ODbL, mises à jour quotidiennes.",
      },
      { property: "og:title", content: "Données ouvertes — Observatoire" },
      {
        property: "og:description",
        content: "Open data signalements et interventions 19/24 sous licence ODbL.",
      },
    ],
  }),
  component: DonneesPage,
});

function DonneesPage() {
  const s = statsGlobales();
  return (
    <div className="container-edit py-12">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-hornet">
        · Open data
      </span>
      <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight md:text-6xl">
        Données ouvertes
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        L'Observatoire publie l'ensemble de ses données sous licence{" "}
        <a
          href="https://opendatacommons.org/licenses/odbl/"
          target="_blank"
          rel="noreferrer"
          className="link-editorial"
        >
          ODbL
        </a>
        . Les exports sont actualisés quotidiennement à 6 h et utilisables librement par les
        communes, chercheurs, journalistes et apiculteurs.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatTile label="Signalements" value={s.total} variant="default" />
        <StatTile label="Détruits" value={s.detruits} variant="success" />
        <StatTile label="Communes touchées" value={s.communesImpactees} variant="ink" />
        <StatTile label="Top 10 suivies" value={COMMUNES.length} variant="alert" />
      </div>

      {/* Téléchargements */}
      <section className="mt-16">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            Jeux de données
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Mise à jour : aujourd'hui 06:00
          </span>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {[
            {
              f: "CSV",
              t: "Signalements bruts (90 j)",
              s: "412 Ko",
              d: "Toutes les remontées géolocalisées avec statut, type, date, source.",
            },
            {
              f: "GeoJSON",
              t: "Pins cartographiques",
              s: "624 Ko",
              d: "Format prêt à l'emploi pour Leaflet, MapLibre, QGIS.",
            },
            {
              f: "JSON",
              t: "Communes & statistiques",
              s: "188 Ko",
              d: "Top 10 communes prioritaires avec données INSEE et chiffres frelon.",
            },
            {
              f: "JSON",
              t: "Évolution mensuelle 12 mois",
              s: "12 Ko",
              d: "Série temporelle agrégée par mois, par département.",
            },
            {
              f: "PDF",
              t: "Bilan annuel 2025",
              s: "2,1 Mo",
              d: "Rapport synthétique 24 pages : analyse, méthodologie, perspectives.",
            },
            {
              f: "PDF",
              t: "Note méthodologique",
              s: "320 Ko",
              d: "Sources, vérification, anonymisation, limites du jeu de données.",
            },
          ].map((d) => (
            <a
              key={d.t}
              href="#"
              className="group flex items-start justify-between gap-4 rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-soft"
            >
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-hornet">
                  {d.f} · {d.s}
                </div>
                <div className="mt-1.5 font-display text-lg font-semibold">{d.t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{d.d}</p>
              </div>
              <Download
                className="mt-1 h-5 w-5 shrink-0 text-muted-foreground group-hover:text-hornet"
                strokeWidth={2}
              />
            </a>
          ))}
        </div>
      </section>

      {/* Graphique */}
      <section className="mt-16 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EvolutionChart />
        </div>
        <div className="rounded-2xl border border-border bg-paper p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-hornet">
            · Lecture
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold">Saisonnalité marquée</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Les signalements connaissent un pic très net en septembre-octobre, lorsque les
            nids secondaires deviennent visibles après la chute des feuilles. Une activité
            résiduelle en hiver correspond à la découverte tardive de nids vides.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 text-center">
            <div className="rounded-lg bg-card p-3">
              <div className="num text-2xl font-semibold">Sept.</div>
              <div className="font-mono text-[10px] uppercase text-muted-foreground">
                Pic annuel
              </div>
            </div>
            <div className="rounded-lg bg-card p-3">
              <div className="num text-2xl font-semibold">+18 %</div>
              <div className="font-mono text-[10px] uppercase text-muted-foreground">
                vs n-1
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API */}
      <section className="mt-16 rounded-2xl border border-border bg-ink p-8 text-cream md:p-10">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-hornet">
          <FileCode className="h-3.5 w-3.5" /> API publique
        </div>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Accès programmatique
        </h2>
        <p className="mt-3 max-w-2xl text-cream/70">
          Une API REST en lecture seule est mise à disposition pour les intégrations
          tierces. Authentification par clé API gratuite, quota de 1 000 requêtes / jour.
        </p>
        <pre className="mt-6 overflow-x-auto rounded-lg bg-cream/[0.04] p-4 font-mono text-xs text-cream/90">
          <code>{`GET https://api.observatoire-frelon.fr/v1/signalements?dep=19&since=2026-01-01
Authorization: Bearer <votre_clef>

→ 200 OK
[
  { "id": "brive-la-gaillarde-12",
    "commune": "brive-la-gaillarde",
    "lat": 45.1591, "lng": 1.5331,
    "statut": "detruit", "date": "2026-04-12T08:14:00Z" }
]`}</code>
        </pre>
        <a
          href="#"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-hornet px-5 py-3 text-sm font-semibold text-hornet-foreground hover:bg-hornet/90"
        >
          Demander une clé API →
        </a>
      </section>

      {/* Couverture */}
      <section className="mt-16">
        <h2 className="font-display text-3xl font-semibold tracking-tight">
          Couverture territoriale
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {Object.values(DEPARTEMENTS).map((d) => (
            <div key={d.code} className="rounded-xl border border-border bg-card p-6">
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Département {d.code}
              </div>
              <h3 className="mt-2 font-display text-2xl font-semibold">{d.nom}</h3>
              <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
                <li className="text-muted-foreground">Population</li>
                <li className="num text-right font-medium">{formatNombre(d.population)}</li>
                <li className="text-muted-foreground">Superficie</li>
                <li className="num text-right font-medium">{formatNombre(d.superficie)} km²</li>
                <li className="text-muted-foreground">Communes</li>
                <li className="num text-right font-medium">{d.nbCommunes}</li>
                <li className="text-muted-foreground">Arrondissements</li>
                <li className="num text-right font-medium">{d.arrondissements}</li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Licence + sources */}
      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-hornet">
            <Scale className="h-3.5 w-3.5" /> Licence
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold">Open Database License</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Vous êtes libre de copier, distribuer, modifier et utiliser les données, y
            compris commercialement, à condition de mentionner la source « Observatoire du
            Frelon Asiatique 19/24 » et de partager toute base dérivée sous la même licence.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-hornet">
            <Database className="h-3.5 w-3.5" /> Sources
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold">Origine des données</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>· Signalements citoyens via le formulaire de l'Observatoire</li>
            <li>· FREDON Nouvelle-Aquitaine (interventions confirmées)</li>
            <li>· GDSA Corrèze et GDSA Dordogne (alertes apicoles)</li>
            <li>· Mairies partenaires (registres communaux)</li>
            <li>· Désinsectiseurs agréés (rapports d'intervention)</li>
          </ul>
        </div>
      </section>

      <div className="mt-12 text-center">
        <Link
          to="/signaler-un-nid"
          className="inline-flex items-center gap-2 rounded-md bg-hornet px-6 py-3 text-sm font-semibold text-hornet-foreground hover:bg-hornet/90"
        >
          Contribuer à la donnée : signaler un nid →
        </Link>
      </div>
    </div>
  );
}
