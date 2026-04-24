import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/cartographie", label: "Carte" },
  { to: "/actualites", label: "Actualités" },
  { to: "/correze-19", label: "Corrèze" },
  { to: "/dordogne-24", label: "Dordogne" },
  { to: "/guides", label: "Guides" },
  { to: "/donnees", label: "Données" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
      <div className="container-edit flex h-16 items-center justify-between gap-6">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-ink text-hornet shadow-soft">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M12 3c2.5 2 4 4.5 4 7 0 1.8-.8 3.2-2 4 .8 1 2 1.5 3.5 1.5L16 18l-4-2-4 2-1.5-2.5C8 15.5 9.2 15 10 14c-1.2-.8-2-2.2-2-4 0-2.5 1.5-5 4-7Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="9" r="1" fill="currentColor" />
            </svg>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
              Observatoire du Frelon Asiatique
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Corrèze · Dordogne
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "bg-accent text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/signaler-un-nid"
            className="hidden items-center gap-2 rounded-md bg-hornet px-4 py-2 text-sm font-semibold text-hornet-foreground shadow-soft transition-transform hover:-translate-y-0.5 hover:shadow-pop sm:inline-flex"
          >
            Signaler un nid
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-md border border-border bg-paper lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-paper lg:hidden">
          <nav className="container-edit flex flex-col py-3">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-foreground/80 hover:bg-accent"
                activeProps={{ className: "bg-accent text-foreground" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/signaler-un-nid"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-hornet px-4 py-3 text-sm font-semibold text-hornet-foreground"
            >
              Signaler un nid
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
