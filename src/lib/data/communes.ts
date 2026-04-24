// Dataset communes prioritaires Corrèze (19) & Dordogne (24)
// Données INSEE simplifiées + chiffres signalements mockés réalistes

export type Departement = "19" | "24";

export interface Commune {
  slug: string;
  nom: string;
  departement: Departement;
  departementNom: string;
  arrondissement: string;
  arrondissementSlug: string;
  population: number;
  codePostal: string;
  altitude: number;
  lat: number;
  lng: number;
  // Données frelon
  signalements12mois: number;
  nidsDetruits: number;
  nidsActifs: number;
  evolution: number; // % vs n-1
  premierSignalement: string; // année
  risque: "faible" | "modéré" | "élevé";
  contexteApicole: number; // nb ruchers déclarés (mock)
  limitrophes: string[]; // slugs
}

export const COMMUNES: Commune[] = [
  // ───── CORRÈZE (19) ─────
  {
    slug: "brive-la-gaillarde",
    nom: "Brive-la-Gaillarde",
    departement: "19",
    departementNom: "Corrèze",
    arrondissement: "Brive-la-Gaillarde",
    arrondissementSlug: "brive-la-gaillarde-arrondissement",
    population: 46961,
    codePostal: "19100",
    altitude: 142,
    lat: 45.1591,
    lng: 1.5331,
    signalements12mois: 47,
    nidsDetruits: 41,
    nidsActifs: 6,
    evolution: 18,
    premierSignalement: "2018",
    risque: "élevé",
    contexteApicole: 38,
    limitrophes: ["malemort-sur-correze", "ussac", "saint-pantaleon-de-larche"],
  },
  {
    slug: "tulle",
    nom: "Tulle",
    departement: "19",
    departementNom: "Corrèze",
    arrondissement: "Tulle",
    arrondissementSlug: "tulle-arrondissement",
    population: 14809,
    codePostal: "19000",
    altitude: 210,
    lat: 45.2697,
    lng: 1.7714,
    signalements12mois: 23,
    nidsDetruits: 19,
    nidsActifs: 4,
    evolution: 12,
    premierSignalement: "2019",
    risque: "modéré",
    contexteApicole: 24,
    limitrophes: ["naves", "laguenne-sur-avalouze"],
  },
  {
    slug: "ussel",
    nom: "Ussel",
    departement: "19",
    departementNom: "Corrèze",
    arrondissement: "Ussel",
    arrondissementSlug: "ussel-arrondissement",
    population: 9661,
    codePostal: "19200",
    altitude: 631,
    lat: 45.5494,
    lng: 2.3094,
    signalements12mois: 8,
    nidsDetruits: 7,
    nidsActifs: 1,
    evolution: 33,
    premierSignalement: "2021",
    risque: "faible",
    contexteApicole: 17,
    limitrophes: ["saint-angel", "chirac-bellevue"],
  },
  {
    slug: "malemort-sur-correze",
    nom: "Malemort",
    departement: "19",
    departementNom: "Corrèze",
    arrondissement: "Brive-la-Gaillarde",
    arrondissementSlug: "brive-la-gaillarde-arrondissement",
    population: 7658,
    codePostal: "19360",
    altitude: 110,
    lat: 45.1736,
    lng: 1.5667,
    signalements12mois: 19,
    nidsDetruits: 16,
    nidsActifs: 3,
    evolution: 22,
    premierSignalement: "2018",
    risque: "élevé",
    contexteApicole: 11,
    limitrophes: ["brive-la-gaillarde", "ussac"],
  },
  {
    slug: "argentat-sur-dordogne",
    nom: "Argentat-sur-Dordogne",
    departement: "19",
    departementNom: "Corrèze",
    arrondissement: "Tulle",
    arrondissementSlug: "tulle-arrondissement",
    population: 2937,
    codePostal: "19400",
    altitude: 183,
    lat: 45.0944,
    lng: 1.9389,
    signalements12mois: 14,
    nidsDetruits: 12,
    nidsActifs: 2,
    evolution: 27,
    premierSignalement: "2019",
    risque: "modéré",
    contexteApicole: 9,
    limitrophes: ["beaulieu-sur-dordogne", "monceaux-sur-dordogne"],
  },
  {
    slug: "beaulieu-sur-dordogne",
    nom: "Beaulieu-sur-Dordogne",
    departement: "19",
    departementNom: "Corrèze",
    arrondissement: "Brive-la-Gaillarde",
    arrondissementSlug: "brive-la-gaillarde-arrondissement",
    population: 1281,
    codePostal: "19120",
    altitude: 142,
    lat: 44.9786,
    lng: 1.8389,
    signalements12mois: 11,
    nidsDetruits: 9,
    nidsActifs: 2,
    evolution: 37,
    premierSignalement: "2020",
    risque: "modéré",
    contexteApicole: 14,
    limitrophes: ["argentat-sur-dordogne"],
  },
  // ───── DORDOGNE (24) ─────
  {
    slug: "perigueux",
    nom: "Périgueux",
    departement: "24",
    departementNom: "Dordogne",
    arrondissement: "Périgueux",
    arrondissementSlug: "perigueux-arrondissement",
    population: 30036,
    codePostal: "24000",
    altitude: 86,
    lat: 45.1842,
    lng: 0.7222,
    signalements12mois: 52,
    nidsDetruits: 46,
    nidsActifs: 6,
    evolution: 14,
    premierSignalement: "2017",
    risque: "élevé",
    contexteApicole: 31,
    limitrophes: ["coulounieix-chamiers", "boulazac-isle-manoire", "trelissac"],
  },
  {
    slug: "bergerac",
    nom: "Bergerac",
    departement: "24",
    departementNom: "Dordogne",
    arrondissement: "Bergerac",
    arrondissementSlug: "bergerac-arrondissement",
    population: 26922,
    codePostal: "24100",
    altitude: 37,
    lat: 44.8511,
    lng: 0.4828,
    signalements12mois: 61,
    nidsDetruits: 53,
    nidsActifs: 8,
    evolution: 21,
    premierSignalement: "2016",
    risque: "élevé",
    contexteApicole: 47,
    limitrophes: ["creysse", "prigonrieux", "saint-laurent-des-vignes"],
  },
  {
    slug: "sarlat-la-caneda",
    nom: "Sarlat-la-Canéda",
    departement: "24",
    departementNom: "Dordogne",
    arrondissement: "Sarlat-la-Canéda",
    arrondissementSlug: "sarlat-la-caneda-arrondissement",
    population: 8917,
    codePostal: "24200",
    altitude: 145,
    lat: 44.8911,
    lng: 1.2167,
    signalements12mois: 38,
    nidsDetruits: 33,
    nidsActifs: 5,
    evolution: 19,
    premierSignalement: "2017",
    risque: "élevé",
    contexteApicole: 28,
    limitrophes: ["vitrac", "carsac-aillac"],
  },
  {
    slug: "terrasson-lavilledieu",
    nom: "Terrasson-Lavilledieu",
    departement: "24",
    departementNom: "Dordogne",
    arrondissement: "Sarlat-la-Canéda",
    arrondissementSlug: "sarlat-la-caneda-arrondissement",
    population: 5871,
    codePostal: "24120",
    altitude: 91,
    lat: 45.1278,
    lng: 1.3036,
    signalements12mois: 29,
    nidsDetruits: 24,
    nidsActifs: 5,
    evolution: 32,
    premierSignalement: "2018",
    risque: "élevé",
    contexteApicole: 22,
    limitrophes: ["le-lardin-saint-lazare", "condat-sur-vezere"],
  },
  {
    slug: "boulazac-isle-manoire",
    nom: "Boulazac Isle Manoire",
    departement: "24",
    departementNom: "Dordogne",
    arrondissement: "Périgueux",
    arrondissementSlug: "perigueux-arrondissement",
    population: 9520,
    codePostal: "24750",
    altitude: 90,
    lat: 45.1614,
    lng: 0.7547,
    signalements12mois: 27,
    nidsDetruits: 23,
    nidsActifs: 4,
    evolution: 16,
    premierSignalement: "2018",
    risque: "modéré",
    contexteApicole: 13,
    limitrophes: ["perigueux", "trelissac"],
  },
];

export function getCommune(slug: string): Commune | undefined {
  return COMMUNES.find((c) => c.slug === slug);
}

export function getCommunesByDepartement(dep: Departement): Commune[] {
  return COMMUNES.filter((c) => c.departement === dep);
}

export const DEPARTEMENTS = {
  "19": {
    code: "19",
    nom: "Corrèze",
    slug: "correze-19",
    chefLieu: "Tulle",
    population: 240073,
    superficie: 5857,
    nbCommunes: 279,
    arrondissements: 3,
    centroid: { lat: 45.35, lng: 1.85 },
    description:
      "Département rural du sud du Massif central, la Corrèze présente un profil mixte : vallées de la Dordogne et de la Vézère favorables à l'implantation du frelon asiatique, plateaux d'altitude (Millevaches) où la pression reste plus faible.",
  },
  "24": {
    code: "24",
    nom: "Dordogne",
    slug: "dordogne-24",
    chefLieu: "Périgueux",
    population: 408393,
    superficie: 9060,
    nbCommunes: 503,
    arrondissements: 4,
    centroid: { lat: 45.0, lng: 0.85 },
    description:
      "Département majeur sur le front d'invasion depuis 2016, la Dordogne concentre une forte activité apicole et une mosaïque de vergers, vignobles et bois feuillus particulièrement propices à la nidification de Vespa velutina.",
  },
} as const;

export const DEPT_LIST = Object.values(DEPARTEMENTS);
