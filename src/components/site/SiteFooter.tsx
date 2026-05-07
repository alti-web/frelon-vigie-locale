import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-ink text-cream">
      <div className="container-edit grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-2xl font-semibold tracking-tight">
            Observatoire du Frelon Asiatique
          </div>
          <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-cream/60">
            Corrèze (19) · Dordogne (24)
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/70">
            Plateforme indépendante de veille et de signalement, en lien avec la FREDON
            Nouvelle-Aquitaine, les GDSA 19/24 et les services préfectoraux. Données mises à
            jour quotidiennement.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="votre@email.fr"
              className="flex-1 rounded-md border border-cream/15 bg-cream/5 px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-hornet focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-md bg-hornet px-4 py-3 text-sm font-semibold text-hornet-foreground hover:bg-hornet/90"
            >
              Recevoir les alertes
            </button>
          </form>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-cream/40">
            Alertes SMS par commune disponibles · Double opt-in RGPD
          </p>
        </div>

        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/40">
            Départements
          </div>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>
              <Link to="/correze-19" className="hover:text-hornet">
                Corrèze (19)
              </Link>
            </li>
            <li>
              <Link to="/dordogne-24" className="hover:text-hornet">
                Dordogne (24)
              </Link>
            </li>
          </ul>

          <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-cream/40">
            Communes
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-cream/80">
            <li>
              <Link to="/correze-19/$commune" params={{ commune: "brive-la-gaillarde" }} className="hover:text-hornet">
                Brive
              </Link>
            </li>
            <li>
              <Link to="/correze-19/$commune" params={{ commune: "tulle" }} className="hover:text-hornet">
                Tulle
              </Link>
            </li>
            <li>
              <Link to="/correze-19/$commune" params={{ commune: "ussel" }} className="hover:text-hornet">
                Ussel
              </Link>
            </li>
            <li>
              <Link to="/dordogne-24/$commune" params={{ commune: "perigueux" }} className="hover:text-hornet">
                Périgueux
              </Link>
            </li>
            <li>
              <Link to="/dordogne-24/$commune" params={{ commune: "bergerac" }} className="hover:text-hornet">
                Bergerac
              </Link>
            </li>
            <li>
              <Link to="/dordogne-24/$commune" params={{ commune: "sarlat-la-caneda" }} className="hover:text-hornet">
                Sarlat
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/40">
            Ressources
          </div>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>
              <Link to="/signaler-un-nid" className="hover:text-hornet">
                Signaler un nid
              </Link>
            </li>
            <li>
              <Link to="/cartographie" className="hover:text-hornet">
                Cartographie
              </Link>
            </li>
            <li>
              <Link to="/actualites" className="hover:text-hornet">
                Actualités
              </Link>
            </li>
            <li>
              <Link to="/guides" className="hover:text-hornet">
                Guides pratiques
              </Link>
            </li>
            <li>
              <Link to="/donnees" className="hover:text-hornet">
                Données ouvertes
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-edit flex flex-col gap-3 py-6 text-xs text-cream/50 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} Observatoire du Frelon Asiatique — Plateforme
            indépendante de veille citoyenne.
          </div>
          <div className="flex gap-4 font-mono uppercase tracking-wider">
            <Link to="/a-propos" className="hover:text-hornet">À propos</Link>
            <Link to="/contact" className="hover:text-hornet">Contact</Link>
            <Link to="/mentions-legales" className="hover:text-hornet">Mentions légales</Link>
            <Link to="/rgpd" className="hover:text-hornet">RGPD</Link>
            <Link to="/accessibilite" className="hover:text-hornet">Accessibilité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
