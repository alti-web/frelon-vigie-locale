import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import {
  listAllSignalements,
  updateSignalementAdmin,
  deleteSignalementAdmin,
} from "@/lib/signalements.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Modération des signalements" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type Row = {
  id: string;
  adresse: string;
  code_postal: string;
  commune_nom: string | null;
  departement: "19" | "24";
  lat: number | null;
  lng: number | null;
  type: "primaire" | "secondaire" | "piege" | "attaque-rucher";
  hauteur: string | null;
  diametre: string | null;
  statut: "signale" | "confirme" | "detruit";
  declarant_prenom: string;
  declarant_nom: string;
  declarant_email: string;
  declarant_profil: string;
  moderation_status: "pending" | "approved" | "rejected";
  created_at: string;
};

function AdminPage() {
  const list = useServerFn(listAllSignalements);
  const update = useServerFn(updateSignalementAdmin);
  const del = useServerFn(deleteSignalementAdmin);
  const qc = useQueryClient();

  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-signalements"],
    queryFn: () => list(),
  });

  const items = (data?.items ?? []) as Row[];
  const filtered = items.filter((r) => filter === "all" || r.moderation_status === filter);

  const counts = {
    all: items.length,
    pending: items.filter((r) => r.moderation_status === "pending").length,
    approved: items.filter((r) => r.moderation_status === "approved").length,
    rejected: items.filter((r) => r.moderation_status === "rejected").length,
  };

  type UpdateVars = {
    id: string;
    moderation_status?: Row["moderation_status"];
    statut?: Row["statut"];
    lat?: number | null;
    lng?: number | null;
  };
  const mUpdate = useMutation({
    mutationFn: (vars: UpdateVars) => update({ data: vars }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-signalements"] });
      qc.invalidateQueries({ queryKey: ["public-signalements"] });
    },
  });

  const mDelete = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-signalements"] });
      qc.invalidateQueries({ queryKey: ["public-signalements"] });
    },
  });

  return (
    <div className="container-edit py-12">
      <div className="rounded-md border border-alert/40 bg-alert/5 p-3 text-xs text-alert">
        ⚠️ Page non protégée par mot de passe. Toute personne connaissant l'URL
        peut modérer. À sécuriser dès que possible.
      </div>

      <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight">
        Modération des signalements
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Approuvez un signalement pour qu'il apparaisse sur la carte publique et
        l'accueil. Vous pouvez aussi changer son statut (signalé → confirmé → détruit)
        ou corriger ses coordonnées.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["pending", "approved", "rejected", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              filter === f
                ? "bg-foreground text-background"
                : "border border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {f === "all" ? "Tous" : f === "pending" ? "En attente" : f === "approved" ? "Approuvés" : "Rejetés"}
            <span className="ml-2 opacity-60">{counts[f]}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-border">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground">Chargement…</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">Aucun signalement.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-paper">
              <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Localisation</th>
                <th className="px-3 py-2">Nid</th>
                <th className="px-3 py-2">Déclarant</th>
                <th className="px-3 py-2">Coords</th>
                <th className="px-3 py-2">Statut</th>
                <th className="px-3 py-2">Modération</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-border align-top">
                  <td className="px-3 py-2 font-mono text-[11px] text-muted-foreground">
                    {new Date(r.created_at).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-3 py-2">
                    <div className="font-medium">{r.commune_nom ?? "—"} ({r.departement})</div>
                    <div className="text-xs text-muted-foreground">{r.adresse}</div>
                    <div className="text-xs text-muted-foreground">{r.code_postal}</div>
                  </td>
                  <td className="px-3 py-2">
                    <div>{r.type}</div>
                    {r.hauteur && <div className="text-xs text-muted-foreground">H {r.hauteur}</div>}
                    {r.diametre && <div className="text-xs text-muted-foreground">Ø {r.diametre}</div>}
                  </td>
                  <td className="px-3 py-2">
                    <div>{r.declarant_prenom} {r.declarant_nom}</div>
                    <div className="text-xs text-muted-foreground">{r.declarant_email}</div>
                    <div className="text-xs text-muted-foreground">{r.declarant_profil}</div>
                  </td>
                  <td className="px-3 py-2">
                    <CoordsEditor row={r} onSave={(lat, lng) => mUpdate.mutate({ id: r.id, lat, lng })} />
                  </td>
                  <td className="px-3 py-2">
                    <select
                      value={r.statut}
                      onChange={(e) =>
                        mUpdate.mutate({ id: r.id, statut: e.target.value as Row["statut"] })
                      }
                      className="rounded border border-border bg-background px-2 py-1 text-xs"
                    >
                      <option value="signale">Signalé</option>
                      <option value="confirme">Confirmé</option>
                      <option value="detruit">Détruit</option>
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <select
                      value={r.moderation_status}
                      onChange={(e) =>
                        mUpdate.mutate({
                          id: r.id,
                          moderation_status: e.target.value as Row["moderation_status"],
                        })
                      }
                      className="rounded border border-border bg-background px-2 py-1 text-xs"
                    >
                      <option value="pending">En attente</option>
                      <option value="approved">Approuvé</option>
                      <option value="rejected">Rejeté</option>
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => {
                        if (confirm("Supprimer définitivement ce signalement ?")) {
                          mDelete.mutate(r.id);
                        }
                      }}
                      className="rounded border border-alert/40 px-2 py-1 text-xs text-alert hover:bg-alert hover:text-white"
                    >
                      Suppr.
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function CoordsEditor({
  row,
  onSave,
}: {
  row: Row;
  onSave: (lat: number | null, lng: number | null) => void;
}) {
  const [lat, setLat] = useState(row.lat?.toString() ?? "");
  const [lng, setLng] = useState(row.lng?.toString() ?? "");
  const dirty = lat !== (row.lat?.toString() ?? "") || lng !== (row.lng?.toString() ?? "");
  return (
    <div className="flex flex-col gap-1">
      <input
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        placeholder="lat"
        className="w-24 rounded border border-border bg-background px-2 py-1 text-xs"
      />
      <input
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        placeholder="lng"
        className="w-24 rounded border border-border bg-background px-2 py-1 text-xs"
      />
      {dirty && (
        <button
          onClick={() => {
            const la = lat.trim() === "" ? null : Number(lat);
            const ln = lng.trim() === "" ? null : Number(lng);
            if ((la !== null && Number.isNaN(la)) || (ln !== null && Number.isNaN(ln))) return;
            onSave(la, ln);
          }}
          className="rounded bg-foreground px-2 py-1 text-[10px] uppercase tracking-wider text-background"
        >
          Enregistrer
        </button>
      )}
    </div>
  );
}
