export interface Actualite {
  slug: string;
  titre: string;
  chapo: string;
  commune?: string;
  communeSlug?: string;
  departement: "19" | "24" | "19-24";
  date: string; // ISO
  categorie: "intervention" | "alerte" | "apiculture" | "reglementation" | "veille";
  duree: string; // temps de lecture
}

const j = (n: number) => new Date(Date.now() - n * 86400000).toISOString();

export const ACTUALITES: Actualite[] = [
  {
    slug: "nid-geant-beaulieu-sur-dordogne",
    titre: "Nid géant découvert à Beaulieu-sur-Dordogne, intervention programmée",
    chapo:
      "Un nid secondaire de plus de 80 cm de diamètre a été repéré à 14 mètres de hauteur dans un platane de la place du Champ-de-Mars. L'intervention par perche télescopique est planifiée pour mardi matin.",
    commune: "Beaulieu-sur-Dordogne",
    communeSlug: "beaulieu-sur-dordogne",
    departement: "19",
    date: "2025-11-28T08:00:00.000Z",
    categorie: "intervention",
    duree: "2 min",
  },
  {
    slug: "alerte-apicole-terrasson-3-ruchers",
    titre: "Alerte apicole : trois ruchers attaqués à Terrasson en quinze jours",
    chapo:
      "Le GDSA 24 confirme une pression d'attaque inhabituelle sur les ruchers du nord-est du département. Les apiculteurs sont invités à installer des muselières et à signaler tout nid à proximité.",
    commune: "Terrasson-Lavilledieu",
    communeSlug: "terrasson-lavilledieu",
    departement: "24",
    date: "2025-09-15T08:00:00.000Z",
    categorie: "apiculture",
    duree: "3 min",
  },
  {
    slug: "bergerac-record-signalements-octobre",
    titre: "Bergerac : nombre record de signalements en octobre",
    chapo:
      "Avec 18 nids signalés sur le seul mois d'octobre, Bergerac confirme sa position de commune la plus impactée du département. Les services municipaux renforcent leur dispositif de collecte.",
    commune: "Bergerac",
    communeSlug: "bergerac",
    departement: "24",
    date: "2025-10-20T08:00:00.000Z",
    categorie: "veille",
    duree: "4 min",
  },
  {
    slug: "piegeage-printanier-2026-correze",
    titre: "Piégeage printanier 2026 : la Corrèze prépare sa campagne",
    chapo:
      "Conjointement avec la FREDON Nouvelle-Aquitaine, le département lance dès février une campagne coordonnée de piégeage des fondatrices. Modalités, zones prioritaires et appui technique détaillés.",
    departement: "19",
    date: j(5),
    categorie: "reglementation",
    duree: "5 min",
  },
];


export function actualitesParCommune(slug: string): Actualite[] {
  return ACTUALITES.filter((a) => a.communeSlug === slug);
}

export function actualitesParDepartement(dep: "19" | "24"): Actualite[] {
  return ACTUALITES.filter((a) => a.departement === dep || a.departement === "19-24");
}
