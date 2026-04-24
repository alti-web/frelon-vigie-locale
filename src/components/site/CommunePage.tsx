import { Link, notFound } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Bug,
  CheckCircle2,
  Phone,
  Radio,
} from "lucide-react";
import {
  COMMUNES,
  DEPARTEMENTS,
  getCommune,
  type Commune,
} from "@/lib/data/communes";
import {
  signalementsParCommune,
  type Signalement,
} from "@/lib/data/signalements";
import { actualitesParCommune } from "@/lib/data/actualites";
import { StatTile } from "./StatTile";
import { HornetMap } from "./HornetMap";
import { NewsCard } from "./NewsCard";
import { formatNombre, formatDateLong } from "@/lib/format";

const RISQUE_COLOR: Record<Commune["risque"], string> = {
  faible: "text-success border-success/30 bg-success/10",
  modéré: "text-hornet border-hornet/30 bg-hornet/10",
  élevé: "text-alert border-alert/30 bg-alert/10",
};

// Variantes de chapô pour éviter la duplication
function chapo(c: Commune): string {
  const variantes = [
    `À ${c.nom}, ${c.signalements12mois} nids de frelons asiatiques ont été signalés depuis janvier, dont ${c.nidsDetruits} ont été détruits par des désinsectiseurs agréés. La commune connaît une évolution de ${c.evolution > 0 ? "+" : ""}${c.evolution} % par rapport à l'année précédente.`,
    `La commune de ${c.nom} (${c.codePostal}) est concernée par la présence du frelon asiatique depuis ${c.premierSignalement}. Sur les douze derniers mois, ${c.signalements12mois} nids ont été signalés, dont ${c.nidsDetruits} ont été détruits par des désinsectiseurs agréés.`,
    `${c.nom} fait l'objet d'un suivi rapproché de l'Observatoire avec ${c.signalements12mois} signalements recensés cette année. Le niveau de risque est qualifié de ${c.risque} compte tenu de la densité de ruchers (${c.contexteApicole} déclarés) et de l'activité observée sur le territoire.`,
  ];
  // Choix déterministe basé sur le slug
  const idx = c.slug.charCodeAt(0) % variantes.length;
  return variantes[idx];
}

export function CommunePage({ slug }: { slug: string }) {
  const c = getCommune(slug);
  if (!c) throw notFound();
  const dep = DEPARTEMENTS[c.departement];
  const sig = signalementsParCommune(slug);
  const actus = actualitesParCommune(slug);
  const limitrophes = c.limitrophes
    .map((s) => COMMUNES.find((x) => x.slug === s))
    .filter(Boolean) as Commune[];

  const recents = sig.slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border grain">
        <div className="container-edit py-12 md:py-16">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Observatoire</Link>
            <span className="mx-2 text-border">/</span>
            <Link
              to={c.departement === "19" ? "/correze-19" : "/dordogne-24"}
              className="hover:text-foreground"
            >
              {dep.nom}
            </Link>
            <span className="mx-2 text-border">/</span>
            <span className="text-foreground">{c.nom}</span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className={`badge-status ${RISQUE_COLOR[c.risque]}`}>
              Risque {c.risque}
            </span>
            <span className="badge-status">
              Premier signalement {c.premierSignalement}
            </span>
            <span className="badge-status">{formatNombre(c.population)} hab.</span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Frelon asiatique à {c.nom}
          </h1>
          <div className="mt-2 font-mono text-sm uppercase tracking-wider text-muted-foreground">
            {c.codePostal} · {c.departement === "19" ? "Corrèze" : "Dordogne"} ({c.departement}) ·
            Observatoire local
          </div>

          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {chapo(c)}
          </p>

          <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-4">
            <StatTile label="Signalements 12 m" value={c.signalements12mois} variant="default" />
            <StatTile
              label="Détruits"
              value={c.nidsDetruits}
              trend={`${Math.round((c.nidsDetruits / c.signalements12mois) * 100)} %`}
              variant="success"
              icon={CheckCircle2}
            />
            <StatTile
              label="Actifs estimés"
              value={c.nidsActifs}
              variant="alert"
              icon={AlertTriangle}
            />
            <StatTile
              label="Évolution"
              value={`${c.evolution > 0 ? "+" : ""}${c.evolution}%`}
              trend="vs n-1"
              variant="ink"
            />
          </div>
        </div>
      </section>

      {/* Carte zoomée */}
      <section className="border-b border-border bg-paper/40">
        <div className="container-edit py-12">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-hornet">
                · Cartographie locale
              </span>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
                Signalements à {c.nom}
              </h2>
            </div>
          </div>
          <div className="mt-6">
            <HornetMap
              signalements={sig}
              center={[c.lat, c.lng]}
              zoom={12}
              height="460px"
            />
          </div>
        </div>
      </section>

      {/* Bloc principal 2 colonnes */}
      <section className="border-b border-border">
        <div className="container-edit grid gap-12 py-14 lg:grid-cols-3">
          {/* Col gauche */}
          <div className="space-y-12 lg:col-span-2">
            {/* Que faire si je trouve un nid */}
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                Que faire si je trouve un nid à {c.nom} ?
              </h2>
              <ol className="mt-6 space-y-5">
                {[
                  {
                    n: "01",
                    t: "Ne pas s'approcher",
                    d: "Maintenez une distance d'au moins 5 mètres. Ne tentez jamais de détruire un nid vous-même : risque d'attaque massive.",
                  },
                  {
                    n: "02",
                    t: "Géolocaliser et photographier",
                    d: "Repérez précisément l'emplacement (adresse, repère visuel) et prenez si possible une photo nette du nid à distance.",
                  },
                  {
                    n: "03",
                    t: `Contacter la mairie de ${c.nom}`,
                    d: `La mairie centralise les signalements et active la procédure adaptée selon la localisation (privé / public).`,
                  },
                  {
                    n: "04",
                    t: "Ou signaler directement à l'Observatoire",
                    d: "Notre formulaire transmet automatiquement votre signalement à la FREDON Nouvelle-Aquitaine et au GDSA du département.",
                  },
                ].map((s) => (
                  <li key={s.n} className="flex gap-5 rounded-lg border border-border bg-card p-5">
                    <div className="font-mono text-2xl font-semibold text-hornet">{s.n}</div>
                    <div>
                      <div className="font-display text-lg font-semibold">{s.t}</div>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link
                to="/signaler-un-nid"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-hornet px-5 py-3 text-sm font-semibold text-hornet-foreground hover:bg-hornet/90"
              >
                Signaler un nid à {c.nom}
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </div>

            {/* Timeline signalements récents */}
            {recents.length > 0 && (
              <div>
                <h2 className="font-display text-3xl font-semibold tracking-tight">
                  Derniers signalements
                </h2>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {sig.length} entrées sur les 90 derniers jours
                </p>
                <ol className="mt-6 relative border-l-2 border-border pl-6">
                  {recents.map((s) => (
                    <SignalementLine key={s.id} s={s} />
                  ))}
                </ol>
              </div>
            )}

            {/* Actualités */}
            {actus.length > 0 && (
              <div>
                <h2 className="font-display text-3xl font-semibold tracking-tight">
                  Actualités à {c.nom}
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {actus.map((a) => (
                    <NewsCard key={a.slug} actu={a} compact />
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                Questions fréquentes
              </h2>
              <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
                {[
                  {
                    q: `Qui prend en charge la destruction d'un nid à ${c.nom} ?`,
                    a: `Sur le domaine privé, la destruction est à la charge du propriétaire. Certaines communes du ${dep.nom} participent financièrement — renseignez-vous auprès de la mairie de ${c.nom}.`,
                  },
                  {
                    q: "Combien coûte une intervention ?",
                    a: "Le tarif moyen constaté en 2025 sur les départements 19 et 24 oscille entre 90 € et 180 € selon l'accessibilité (perche, nacelle) et la hauteur du nid.",
                  },
                  {
                    q: "Quelle est la période la plus à risque ?",
                    a: "La fin d'été et l'automne (août à octobre) concentrent l'essentiel des découvertes de nids secondaires, plus visibles après la chute des feuilles.",
                  },
                  {
                    q: "Puis-je piéger les fondatrices au printemps ?",
                    a: "Oui, le piégeage de printemps (février-mai) est encouragé en Corrèze comme en Dordogne, à condition d'utiliser des pièges sélectifs validés par la FREDON.",
                  },
                ].map((f, i) => (
                  <details key={i} className="group">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-medium text-foreground transition-colors hover:bg-paper">
                      {f.q}
                      <span className="font-mono text-xs text-muted-foreground transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="border-t border-border bg-paper/50 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Col droite */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Données commune
              </div>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex justify-between gap-3 border-b border-border pb-2">
                  <span className="text-muted-foreground">Population</span>
                  <span className="num font-medium">{formatNombre(c.population)}</span>
                </li>
                <li className="flex justify-between gap-3 border-b border-border pb-2">
                  <span className="text-muted-foreground">Code postal</span>
                  <span className="num font-medium">{c.codePostal}</span>
                </li>
                <li className="flex justify-between gap-3 border-b border-border pb-2">
                  <span className="text-muted-foreground">Altitude</span>
                  <span className="num font-medium">{c.altitude} m</span>
                </li>
                <li className="flex justify-between gap-3 border-b border-border pb-2">
                  <span className="text-muted-foreground">Arrondissement</span>
                  <span className="font-medium">{c.arrondissement}</span>
                </li>
                <li className="flex justify-between gap-3 border-b border-border pb-2">
                  <span className="text-muted-foreground">Ruchers déclarés</span>
                  <span className="num font-medium">{c.contexteApicole}</span>
                </li>
                <li className="flex justify-between gap-3">
                  <span className="text-muted-foreground">Premier signalement</span>
                  <span className="num font-medium">{c.premierSignalement}</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-alert/30 bg-alert/5 p-6">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-alert">
                <Phone className="h-3.5 w-3.5" /> Urgences
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold">
                Découverte d'un nid à risque
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Si le nid est à proximité immédiate d'une école, d'un EHPAD ou d'un lieu
                public très fréquenté, contactez la mairie de {c.nom} sans délai.
              </p>
              <Link
                to="/signaler-un-nid"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-alert px-4 py-3 text-sm font-semibold text-alert-foreground hover:bg-alert/90"
              >
                Signaler en urgence
              </Link>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Désinsectiseurs à proximité
              </div>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  { nom: "Apidestruct 19/24", dist: "8 km", agree: true },
                  { nom: "Vespa Service Périgord", dist: "14 km", agree: true },
                  { nom: "Hygiène Pro Sud-Ouest", dist: "22 km", agree: false },
                ].map((d) => (
                  <li
                    key={d.nom}
                    className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0"
                  >
                    <div>
                      <div className="font-medium">{d.nom}</div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {d.dist} · {d.agree ? "agréé FREDON" : "professionnel local"}
                      </div>
                    </div>
                    <Bug className="h-4 w-4 text-hornet" strokeWidth={2} />
                  </li>
                ))}
              </ul>
            </div>

            {limitrophes.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Communes limitrophes
                </div>
                <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  {limitrophes.map((l) => (
                    <li key={l.slug}>
                      <Link
                        to={
                          l.departement === "19"
                            ? "/correze-19/$commune"
                            : "/dordogne-24/$commune"
                        }
                        params={{ commune: l.slug }}
                        className="block rounded-md border border-border bg-paper px-3 py-2 text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                      >
                        {l.nom}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* CTA bas */}
      <section>
        <div className="container-edit py-14">
          <div className="rounded-2xl border border-border bg-ink p-10 text-cream">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-hornet">
                  <Radio className="h-3.5 w-3.5" /> Alertes commune
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold md:text-3xl">
                  Recevoir une alerte si un nid est signalé à {c.nom}
                </h3>
                <p className="mt-2 max-w-xl text-cream/70">
                  SMS instantané dès qu'un nouveau signalement est validé dans un rayon de
                  2 km autour de votre adresse. Désinscription en un clic.
                </p>
              </div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-md bg-hornet px-5 py-3 text-sm font-semibold text-hornet-foreground hover:bg-hornet/90"
              >
                Activer les alertes
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SignalementLine({ s }: { s: Signalement }) {
  const color =
    s.statut === "detruit"
      ? "bg-success"
      : s.statut === "confirme"
        ? "bg-alert"
        : "bg-hornet";
  const label =
    s.statut === "detruit" ? "Détruit" : s.statut === "confirme" ? "Confirmé" : "Signalé";
  const tLabel =
    s.type === "primaire"
      ? "Nid primaire"
      : s.type === "secondaire"
        ? "Nid secondaire"
        : s.type === "piege"
          ? "Piège"
          : "Attaque rucher";
  return (
    <li className="relative pb-6 last:pb-0">
      <span className={`absolute -left-[33px] top-1 h-3.5 w-3.5 rounded-full border-2 border-background ${color}`} />
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {formatDateLong(s.date)}
      </div>
      <div className="mt-1 font-medium text-foreground">
        {tLabel}
        {s.hauteur && ` · ${s.hauteur}`}
        {s.diametre && ` · Ø ${s.diametre}`}
      </div>
      <div className="mt-0.5 text-sm text-muted-foreground">
        Statut <span className="text-foreground">{label}</span> · transmis par{" "}
        {s.signalePar === "habitant"
          ? "un habitant"
          : s.signalePar === "apiculteur"
            ? "un apiculteur"
            : s.signalePar === "mairie"
              ? "la mairie"
              : "un désinsectiseur"}
      </div>
    </li>
  );
}
