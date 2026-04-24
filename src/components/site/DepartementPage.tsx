import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  COMMUNES,
  DEPARTEMENTS,
  type Departement as DepCode,
} from "@/lib/data/communes";
import { signalementsParDepartement } from "@/lib/data/signalements";
import { actualitesParDepartement } from "@/lib/data/actualites";
import { StatTile } from "./StatTile";
import { HornetMap } from "./HornetMap";
import { NewsCard } from "./NewsCard";
import { formatNombre } from "@/lib/format";

export function DepartementPage({ code }: { code: DepCode }) {
  const dep = DEPARTEMENTS[code];
  const communes = COMMUNES.filter((c) => c.departement === code);
  const sig = signalementsParDepartement(code);
  const actus = actualitesParDepartement(code);
  const detruits = sig.filter((s) => s.statut === "detruit").length;
  const actifs = sig.filter((s) => s.statut !== "detruit").length;

  const mainCommune = communes.sort((a, b) => b.population - a.population)[0];

  return (
    <>
      <section className="border-b border-border grain">
        <div className="container-edit py-12 md:py-16">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Observatoire</Link>
            <span className="mx-2 text-border">/</span>
            <span className="text-foreground">{dep.nom}</span>
          </div>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            {dep.nom}{" "}
            <span className="font-mono text-2xl text-muted-foreground md:text-3xl">
              ({dep.code})
            </span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {dep.description}
          </p>

          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            <StatTile label="Signalements 90 j" value={sig.length} variant="default" />
            <StatTile
              label="Détruits"
              value={detruits}
              trend={`${Math.round((detruits / Math.max(1, sig.length)) * 100)} %`}
              variant="success"
            />
            <StatTile label="Nids actifs" value={actifs} trend="suivi en cours" variant="alert" />
            <StatTile
              label="Communes suivies"
              value={dep.nbCommunes}
              trend={`${communes.length} prioritaires`}
              variant="ink"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-paper/40">
        <div className="container-edit py-14">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Cartographie {dep.nom}
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {sig.length} pins · zoom {dep.code === "19" ? "départemental" : "départemental"}
            </span>
          </div>
          <div className="mt-6">
            <HornetMap
              signalements={sig}
              center={[dep.centroid.lat, dep.centroid.lng]}
              zoom={9}
              height="540px"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-edit grid gap-12 py-14 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                Communes prioritaires
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Top suivi
              </span>
            </div>
            <ul className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
              {communes
                .sort((a, b) => b.signalements12mois - a.signalements12mois)
                .map((c) => (
                  <li key={c.slug}>
                    <Link
                      to={code === "19" ? "/correze-19/$commune" : "/dordogne-24/$commune"}
                      params={{ commune: c.slug }}
                      className="group flex items-center justify-between gap-4 px-5 py-5 transition-colors hover:bg-paper"
                    >
                      <div>
                        <div className="font-display text-xl font-semibold text-foreground group-hover:text-foreground">
                          {c.nom}
                        </div>
                        <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                          {c.codePostal} · {formatNombre(c.population)} hab. · risque {c.risque}
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="num text-xl font-semibold">
                            {c.signalements12mois}
                          </div>
                          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                            signalements
                          </div>
                        </div>
                        <ArrowRight
                          className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-hornet"
                          strokeWidth={2}
                        />
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Actualités du département
            </h2>
            <div className="mt-6 grid gap-4">
              {actus.map((a) => (
                <NewsCard key={a.slug} actu={a} compact />
              ))}
              {actus.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Aucune actualité récente sur {dep.nom}.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {mainCommune && (
        <section>
          <div className="container-edit py-14">
            <div className="rounded-2xl border border-border bg-ink p-8 text-cream md:p-12">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-hornet">
                · Commune phare
              </div>
              <h3 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
                {mainCommune.nom}, première commune signalée du département
              </h3>
              <p className="mt-4 max-w-2xl text-cream/70">
                Avec {mainCommune.signalements12mois} signalements sur les douze derniers
                mois, {mainCommune.nom} concentre une part importante de l'activité.
                Consultez le détail commune par commune.
              </p>
              <Link
                to={code === "19" ? "/correze-19/$commune" : "/dordogne-24/$commune"}
                params={{ commune: mainCommune.slug }}
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-hornet px-5 py-3 text-sm font-semibold text-hornet-foreground hover:bg-hornet/90"
              >
                Voir le tableau de bord {mainCommune.nom}
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
