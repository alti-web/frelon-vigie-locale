// Signalements mockés — réalistes, étalés sur les 90 derniers jours
import { COMMUNES } from "./communes";

export type StatutNid = "signale" | "confirme" | "detruit";
export type TypeNid = "primaire" | "secondaire" | "piege" | "attaque-rucher";

export interface Signalement {
  id: string;
  commune: string; // slug
  communeNom: string;
  departement: "19" | "24";
  lat: number;
  lng: number;
  statut: StatutNid;
  type: TypeNid;
  hauteur?: string; // ex "8 m"
  diametre?: string; // ex "45 cm"
  date: string; // ISO
  signalePar: "habitant" | "apiculteur" | "mairie" | "desinsectiseur";
}

// Génère des signalements pseudo-aléatoires mais déterministes
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generateSignalements(): Signalement[] {
  const rand = seededRandom(42);
  const list: Signalement[] = [];
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  COMMUNES.forEach((c) => {
    const total = c.signalements12mois;
    const last90 = Math.max(3, Math.round(total * 0.55));
    for (let i = 0; i < last90; i++) {
      const r = rand();
      const r2 = rand();
      const r3 = rand();
      const daysAgo = Math.floor(r * 90);
      const date = new Date(now - daysAgo * day - Math.floor(r2 * day));
      const ratioDetruit = c.nidsDetruits / Math.max(1, c.signalements12mois);
      const statut: StatutNid =
        r3 < ratioDetruit * 0.85
          ? "detruit"
          : r3 < ratioDetruit * 0.85 + 0.1
            ? "confirme"
            : "signale";
      const tType = rand();
      const type: TypeNid =
        tType < 0.55
          ? "secondaire"
          : tType < 0.78
            ? "primaire"
            : tType < 0.92
              ? "piege"
              : "attaque-rucher";
      // Légère dispersion autour du centre commune (~3 km)
      const dLat = (rand() - 0.5) * 0.04;
      const dLng = (rand() - 0.5) * 0.05;
      list.push({
        id: `${c.slug}-${i}`,
        commune: c.slug,
        communeNom: c.nom,
        departement: c.departement,
        lat: c.lat + dLat,
        lng: c.lng + dLng,
        statut,
        type,
        hauteur: type === "secondaire" ? `${4 + Math.floor(rand() * 16)} m` : undefined,
        diametre:
          type !== "piege"
            ? `${20 + Math.floor(rand() * 50)} cm`
            : undefined,
        date: date.toISOString(),
        signalePar:
          rand() < 0.5
            ? "habitant"
            : rand() < 0.7
              ? "apiculteur"
              : rand() < 0.85
                ? "mairie"
                : "desinsectiseur",
      });
    }
  });

  return list.sort((a, b) => b.date.localeCompare(a.date));
}

export const SIGNALEMENTS: Signalement[] = generateSignalements();

export function signalementsParCommune(slug: string): Signalement[] {
  return SIGNALEMENTS.filter((s) => s.commune === slug);
}

export function signalementsParDepartement(dep: "19" | "24"): Signalement[] {
  return SIGNALEMENTS.filter((s) => s.departement === dep);
}

// Statistiques globales
export function statsGlobales() {
  const total = SIGNALEMENTS.length;
  const detruits = SIGNALEMENTS.filter((s) => s.statut === "detruit").length;
  const actifs = SIGNALEMENTS.filter(
    (s) => s.statut !== "detruit" && Date.now() - new Date(s.date).getTime() < 60 * 86400000,
  ).length;
  const communesImpactees = new Set(SIGNALEMENTS.map((s) => s.commune)).size;
  const ceMois = SIGNALEMENTS.filter(
    (s) => Date.now() - new Date(s.date).getTime() < 30 * 86400000,
  ).length;
  return { total, detruits, actifs, communesImpactees, ceMois };
}

// Évolution mensuelle (12 derniers mois)
export function evolutionMensuelle() {
  const now = new Date();
  const buckets: Record<string, { mois: string; signales: number; detruits: number }> = {};
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("fr-FR", { month: "short" }).replace(".", "");
    buckets[key] = { mois: label, signales: 0, detruits: 0 };
  }
  // Simulation cohérente — saisonnalité (pic août-octobre)
  Object.entries(buckets).forEach(([key, v]) => {
    const m = parseInt(key.split("-")[1]);
    const seasonal = [0.2, 0.2, 0.3, 0.5, 0.7, 1.0, 1.4, 2.2, 2.8, 2.5, 1.4, 0.6][m - 1];
    v.signales = Math.round(28 * seasonal);
    v.detruits = Math.round(v.signales * 0.82);
  });
  return Object.values(buckets);
}
