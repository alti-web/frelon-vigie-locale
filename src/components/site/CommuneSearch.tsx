import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { COMMUNES } from "@/lib/data/communes";
import { MapPin, Search } from "lucide-react";

export function CommuneSearch() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    if (!q.trim()) return COMMUNES.slice(0, 6);
    const k = q.toLowerCase();
    return COMMUNES.filter(
      (c) =>
        c.nom.toLowerCase().includes(k) ||
        c.codePostal.startsWith(k) ||
        c.slug.includes(k),
    ).slice(0, 8);
  }, [q]);

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-hornet" strokeWidth={2} />
        <h3 className="font-display text-xl font-semibold">Près de chez vous</h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Tapez le nom de votre commune ou un code postal pour accéder à son tableau de bord.
      </p>

      <div className="relative mt-5">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Brive, 24100, Sarlat…"
          className="w-full rounded-md border border-border bg-paper py-3 pl-11 pr-4 text-sm outline-none focus:border-hornet"
        />
      </div>

      <ul className="mt-4 divide-y divide-border">
        {results.map((c) => (
          <li key={c.slug}>
            <Link
              to={c.departement === "19" ? "/correze-19/$commune" : "/dordogne-24/$commune"}
              params={{ commune: c.slug }}
              className="flex items-center justify-between gap-3 py-3 text-sm transition-colors hover:text-hornet"
            >
              <span>
                <span className="font-medium text-foreground">{c.nom}</span>
                <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {c.codePostal}
                </span>
              </span>
              <span className="num text-xs text-muted-foreground">
                {c.signalements12mois} signalements
              </span>
            </Link>
          </li>
        ))}
        {results.length === 0 && (
          <li className="py-6 text-center text-sm text-muted-foreground">
            Aucune commune trouvée — la base s'enrichit en continu.
          </li>
        )}
      </ul>
    </div>
  );
}
