import type { Signalement } from "@/lib/data/signalements";
import type { PublicSignalement } from "@/lib/signalements.functions";

export function toSignalement(row: PublicSignalement): Signalement | null {
  if (row.lat == null || row.lng == null) return null;
  return {
    id: row.id,
    commune: row.commune_slug ?? "",
    communeNom: row.commune_nom ?? "—",
    departement: row.departement,
    lat: row.lat,
    lng: row.lng,
    statut: row.statut,
    type: row.type,
    hauteur: row.hauteur ?? undefined,
    diametre: row.diametre ?? undefined,
    date: row.created_at,
    signalePar: "habitant",
  };
}

export function toSignalements(rows: PublicSignalement[]): Signalement[] {
  return rows.map(toSignalement).filter((s): s is Signalement => s !== null);
}
