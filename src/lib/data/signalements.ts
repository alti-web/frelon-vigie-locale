// Données de signalements — vidées : aucune donnée fictive.
// Les signalements réels viendront de la base (table public.signalements) via
// les server functions dans src/lib/signalements.functions.ts.

export type StatutNid = "signale" | "confirme" | "detruit";
export type TypeNid = "primaire" | "secondaire" | "piege" | "attaque-rucher";

export interface Signalement {
  id: string;
  commune: string;
  communeNom: string;
  departement: "19" | "24";
  lat: number;
  lng: number;
  statut: StatutNid;
  type: TypeNid;
  hauteur?: string;
  diametre?: string;
  date: string;
  signalePar: "habitant" | "apiculteur" | "mairie" | "desinsectiseur";
}

// Tableau vide : les premiers signalements réels apparaîtront ici dès
// qu'ils auront été modérés et chargés depuis la base.
export const SIGNALEMENTS: Signalement[] = [];

export function signalementsParCommune(_slug: string): Signalement[] {
  return [];
}

export function signalementsParDepartement(_dep: "19" | "24"): Signalement[] {
  return [];
}

export function statsGlobales() {
  return { total: 0, detruits: 0, actifs: 0, communesImpactees: 0, ceMois: 0 };
}

export function evolutionMensuelle() {
  const now = new Date();
  const out: { mois: string; signales: number; detruits: number }[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    out.push({
      mois: d.toLocaleDateString("fr-FR", { month: "short" }).replace(".", ""),
      signales: 0,
      detruits: 0,
    });
  }
  return out;
}
