import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Radio,
  Shield,
  TriangleAlert,
} from "lucide-react";
import { SIGNALEMENTS, statsGlobales } from "@/lib/data/signalements";
import { ACTUALITES } from "@/lib/data/actualites";
import { COMMUNES, DEPARTEMENTS } from "@/lib/data/communes";
import { StatTile } from "@/components/site/StatTile";
import { LiveCounter } from "@/components/site/LiveCounter";
import { HornetMap } from "@/components/site/HornetMap";
import { NewsCard } from "@/components/site/NewsCard";
import { CommuneSearch } from "@/components/site/CommuneSearch";
import { EvolutionChart } from "@/components/site/EvolutionChart";
import { formatNombre } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Observatoire du Frelon Asiatique — Corrèze (19) & Dordogne (24) | Signalements en temps réel",
      },
      {
        name: "description",
        content:
          "Suivez en temps réel les signalements, destructions et alertes liés au frelon asiatique en Corrèze et en Dordogne. Cartographie, données ouvertes, guides pratiques.",
      },
      {
        property: "og:title",
        content: "Observatoire du Frelon Asiatique — Corrèze & Dordogne",
      },
      {
        property: "og:description",
        content:
          "Plateforme indépendante de veille citoyenne : signalements, interventions et alertes apicoles sur les départements 19 et 24.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const stats = statsGlobales();
  const hasData = stats.total > 0;
  const lastUpdate = new Date(SIGNALEMENTS[0]?.date ?? new Date().toISOString());
  const [minutesAgo, setMinutesAgo] = useState<number | null>(null);
  useEffect(() => {
    if (!hasData) return;
    const compute = () =>
      setMinutesAgo(
        Math.max(1, Math.floor((Date.now() - lastUpdate.getTime()) / 60000)),
      );
    compute();
    const id = setInterval(compute, 60000);
    return () => clearInterval(id);
  }, [lastUpdate, hasData]);
  const lastNews = ACTUALITES.slice(0, 4);
  const pct = (n: number) => (stats.total > 0 ? Math.round((n / stats.total) * 100) : 0);
  const topCommune = [...COMMUNES].sort(
    (a, b) => b.signalements12mois - a.signalements12mois,
  )[0];

  return (
    <>
      {/* ───── HERO ───── */}
      <section className="relative overflow-hidden border-b border-border grain">
        <div className="container-edit relative grid gap-12 py-14 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-alert opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-alert" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                En attente des premiers signalements{minutesAgo !== null ? ` · dernière mise à jour il y a ${minutesAgo} min` : ""}
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl"
            >
              Observatoire du{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10">Frelon Asiatique</span>
                <span className="absolute inset-x-0 bottom-1 h-3 -skew-x-6 bg-hornet/60" />
              </span>
              <br />
              <span className="font-display text-4xl text-muted-foreground md:text-5xl lg:text-6xl">
                Corrèze · Dordogne
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            >
              En Corrèze et en Dordogne, le frelon asiatique progresse chaque année.
              L'Observatoire centralise les signalements citoyens, les interventions des
              désinsectiseurs agréés et les alertes apicoles pour offrir une vision claire,
              à jour et gratuite de la situation sur les deux départements.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/signaler-un-nid"
                className="group inline-flex items-center gap-2 rounded-md bg-hornet px-6 py-4 text-base font-semibold text-hornet-foreground shadow-card transition-all hover:-translate-y-0.5 hover:shadow-pop"
              >
                <TriangleAlert className="h-5 w-5" strokeWidth={2.2} />
                Signaler un nid
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </Link>
              <Link
                to="/cartographie"
                className="inline-flex items-center gap-2 rounded-md border border-foreground/20 bg-paper px-6 py-4 text-base font-semibold text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
              >
                <MapPin className="h-5 w-5" strokeWidth={2} />
                Voir la carte
              </Link>
            </motion.div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Radio className="h-3 w-3 text-alert" /> Données quotidiennes
              </span>
              <span>FREDON Nouvelle-Aquitaine</span>
              <span>GDSA 19 · 24</span>
              <span>Préfectures 19 · 24</span>
            </div>
          </div>

          {/* Bloc compteurs hero */}
          <div className="grid gap-4 lg:col-span-5 lg:pt-16">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Cumul total
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="num text-6xl font-semibold text-foreground md:text-7xl">
                  <LiveCounter value={stats.total} />
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  signalements
                </span>
              </div>
              <div className="mt-2 font-mono text-[11px] text-muted-foreground">
                sur les 90 derniers jours · départements 19 & 24
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <StatTile
                label="Ce mois"
                value={stats.ceMois}
                trend="+12 % vs n-1"
                variant="default"
                delay={0.1}
              />
              <StatTile
                label="Détruits"
                value={stats.detruits}
                trend={`${pct(stats.detruits)} %`}
                variant="success"
                icon={CheckCircle2}
                delay={0.15}
              />
              <StatTile
                label="Actifs"
                value={stats.actifs}
                trend="< 60 jours"
                variant="alert"
                icon={AlertTriangle}
                delay={0.2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───── CARTE ───── */}
      <section className="border-b border-border bg-paper/40">
        <div className="container-edit py-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-hornet">
                · Cartographie temps réel
              </span>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {formatNombre(stats.communesImpactees)} communes impactées sur la zone 19/24
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                Chaque pin correspond à un signalement vérifié. Les pulsations rouges
                indiquent les nids actifs identifiés ces sept derniers jours.
              </p>
            </div>
            <Link
              to="/cartographie"
              className="hidden shrink-0 items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-foreground hover:text-hornet md:inline-flex"
            >
              Carte plein écran <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </Link>
          </div>

          <div className="mt-8">
            <HornetMap signalements={SIGNALEMENTS} />
          </div>
        </div>
      </section>

      {/* ───── ACTUALITÉS + RECHERCHE ───── */}
      <section className="border-b border-border">
        <div className="container-edit grid gap-12 py-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-end justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-hornet">
                  · Le fil
                </span>
                <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  Actualités terrain
                </h2>
              </div>
              <Link
                to="/actualites"
                className="font-mono text-[11px] uppercase tracking-wider text-foreground hover:text-hornet"
              >
                Tout le fil →
              </Link>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {lastNews.map((a) => (
                <NewsCard key={a.slug} actu={a} />
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <CommuneSearch />
          </div>
        </div>
      </section>

      {/* ───── DEPARTEMENTS ───── */}
      <section className="border-b border-border bg-ink text-cream">
        <div className="container-edit py-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-hornet">
            · Tableaux départementaux
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Deux départements, deux dynamiques.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {Object.values(DEPARTEMENTS).map((d) => {
              const sigDept = SIGNALEMENTS.filter((s) => s.departement === d.code);
              const detr = sigDept.filter((s) => s.statut === "detruit").length;
              return (
                <Link
                  key={d.code}
                  to={d.code === "19" ? "/correze-19" : "/dordogne-24"}
                  className="group relative overflow-hidden rounded-2xl border border-cream/10 bg-cream/[0.03] p-8 transition-all hover:border-hornet/40 hover:bg-cream/[0.06]"
                >
                  <div className="flex items-baseline justify-between">
                    <div className="font-display text-5xl font-semibold">{d.nom}</div>
                    <div className="font-mono text-xs text-cream/40">{d.code}</div>
                  </div>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/70">
                    {d.description}
                  </p>
                  <div className="mt-8 grid grid-cols-3 gap-4 border-t border-cream/10 pt-6">
                    <div>
                      <div className="num text-3xl font-semibold">
                        {formatNombre(sigDept.length)}
                      </div>
                      <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-cream/50">
                        Signalements
                      </div>
                    </div>
                    <div>
                      <div className="num text-3xl font-semibold text-success">
                        {formatNombre(detr)}
                      </div>
                      <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-cream/50">
                        Détruits
                      </div>
                    </div>
                    <div>
                      <div className="num text-3xl font-semibold">{d.nbCommunes}</div>
                      <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-cream/50">
                        Communes
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-hornet">
                    Ouvrir le tableau de bord
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      strokeWidth={2.5}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── STATS / GRAPHIQUE ───── */}
      <section className="border-b border-border">
        <div className="container-edit grid gap-8 py-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <EvolutionChart />
          </div>
          <div className="grid gap-4">
            <StatTile
              label="Top commune"
              value={hasData ? topCommune.nom : "—"}
              trend={hasData ? `${topCommune.signalements12mois} signalements` : "en attente"}
              variant="ink"
            />
            <StatTile
              label="Pic saisonnier"
              value="Septembre"
              trend="estimation FREDON"
              variant="alert"
            />
            <StatTile
              label="Taux destruction"
              value={hasData ? `${pct(stats.detruits)} %` : "—"}
              trend="objectif > 90 %"
              variant="success"
            />
            <Link
              to="/donnees"
              className="rounded-lg border border-dashed border-border bg-paper p-4 text-center font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:border-foreground hover:text-foreground"
            >
              Consulter les données ouvertes →
            </Link>
          </div>
        </div>
      </section>

      {/* ───── RESSOURCES 4 TUILES ───── */}
      <section className="border-b border-border bg-paper/40">
        <div className="container-edit py-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-hornet">
            · Ressources
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Reconnaître, signaler, protéger.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                to: "/guides/reconnaitre-frelon-asiatique-europeen",
                num: "01",
                title: "Reconnaître",
                desc: "Distinguer Vespa velutina de Vespa crabro en moins de 30 secondes.",
              },
              {
                to: "/signaler-un-nid",
                num: "02",
                title: "Signaler",
                desc: "Transmettre un signalement géolocalisé avec photo en 3 écrans.",
              },
              {
                to: "/guides/protocole-destruction-nid",
                num: "03",
                title: "Faire détruire",
                desc: "Trouver un désinsectiseur agréé et comprendre les prises en charge.",
              },
              {
                to: "/guides/proteger-ruches-dordogne",
                num: "04",
                title: "Protéger ses ruches",
                desc: "Protocole muselières, harpes électriques, piégeage de protection.",
              },
            ].map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-foreground/30 hover:shadow-card"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-hornet">
                  · {r.num}
                </div>
                <div className="mt-4 font-display text-2xl font-semibold">{r.title}</div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {r.desc}
                </p>
                <div className="mt-6 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-foreground/70 group-hover:text-foreground">
                  En savoir plus
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── PARTENAIRES ───── */}
      <section>
        <div className="container-edit py-16">
          <div className="flex flex-col items-start gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-hornet">
                · Partenaires & sources
              </span>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                Des données issues du terrain, croisées avec les protocoles officiels.
              </h2>
            </div>
            <Shield className="hidden h-10 w-10 text-muted-foreground/40 md:block" strokeWidth={1.5} />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
            {[
              "FREDON Nouvelle-Aquitaine",
              "GDSA Corrèze",
              "GDSA Dordogne",
              "Préfectures 19 / 24",
              "INRAE",
              "MNHN",
              "Communes adhérentes",
              "Réseau désinsectiseurs",
            ].map((p) => (
              <div
                key={p}
                className="flex h-24 items-center justify-center bg-card px-4 text-center font-display text-sm text-muted-foreground"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
