import { useEffect, useRef, useState } from "react";
import type { Signalement } from "@/lib/data/signalements";

interface Props {
  signalements: Signalement[];
  center?: [number, number];
  zoom?: number;
  height?: string;
}

const STATUS_COLORS = {
  signale: "#F4B400",
  confirme: "#D93025",
  detruit: "#1E7A3C",
} as const;

const STATUS_LABEL = {
  signale: "Signalé",
  confirme: "Confirmé",
  detruit: "Détruit",
} as const;

const TYPE_LABEL = {
  primaire: "Nid primaire",
  secondaire: "Nid secondaire",
  piege: "Piège",
  "attaque-rucher": "Attaque rucher",
} as const;

export function HornetMap({
  signalements,
  center = [45.0, 1.3],
  zoom = 8,
  height = "520px",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState<"all" | "signale" | "confirme" | "detruit">("all");

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;
    let map: any = null;

    (async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, {
        center,
        zoom,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });
      mapRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · © <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        },
      ).addTo(map);

      setReady(true);
    })();

    return () => {
      cancelled = true;
      if (map) map.remove();
      mapRef.current = null;
    };
    // Init une seule fois — center/zoom sont des valeurs initiales.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (!ready || !mapRef.current) return;
    const map = mapRef.current as any;

    // Clear previous markers
    map.eachLayer((layer: any) => {
      if (layer._isHornetPin) map.removeLayer(layer);
    });

    (async () => {
      const L = await import("leaflet");

      const filtered = signalements.filter(
        (s) => filter === "all" || s.statut === filter,
      );

      filtered.forEach((s) => {
        const color = STATUS_COLORS[s.statut];
        const isRecent =
          s.statut !== "detruit" &&
          Date.now() - new Date(s.date).getTime() < 7 * 86400000;

        const icon = L.divIcon({
          className: "hornet-pin",
          html: `<span style="
            display:block;width:14px;height:14px;border-radius:50%;
            background:${color};border:2px solid #fff;
            box-shadow:0 1px 3px rgba(0,0,0,.3);
            ${isRecent ? "animation: hornet-pulse 2s infinite;" : ""}
          "></span>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });

        const marker = L.marker([s.lat, s.lng], { icon });
        (marker as any)._isHornetPin = true;
        marker.bindPopup(
          `<div style="font-family:Inter,sans-serif;min-width:180px">
            <div style="font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#666;font-family:'JetBrains Mono',monospace">
              ${TYPE_LABEL[s.type]} · ${STATUS_LABEL[s.statut]}
            </div>
            <div style="font-weight:600;margin-top:4px;font-size:14px">${s.communeNom}</div>
            ${s.hauteur ? `<div style="font-size:12px;color:#444;margin-top:2px">Hauteur ${s.hauteur}${s.diametre ? ` · Ø ${s.diametre}` : ""}</div>` : ""}
            <div style="font-size:11px;color:#888;margin-top:6px">
              ${new Date(s.date).toLocaleDateString("fr-FR")}
            </div>
          </div>`,
        );
        marker.addTo(map);
      });
    })();
  }, [ready, signalements, filter]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-paper px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Filtrer ·
          </span>
          {(["all", "signale", "confirme", "detruit"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                filter === f
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {f === "all" ? "Tous" : STATUS_LABEL[f]}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-hornet" /> Signalé
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-alert" /> Confirmé
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-success" /> Détruit
          </span>
        </div>
      </div>
      <div ref={containerRef} style={{ height, width: "100%" }} />
      {!ready && (
        <div className="absolute inset-0 grid place-items-center bg-muted/40">
          <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Chargement de la carte…
          </div>
        </div>
      )}
    </div>
  );
}
