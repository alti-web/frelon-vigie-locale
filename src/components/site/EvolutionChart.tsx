import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { evolutionMensuelle } from "@/lib/data/signalements";

export function EvolutionChart() {
  const data = evolutionMensuelle();
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
      <div className="mb-2 flex items-baseline justify-between">
        <div>
          <h3 className="font-display text-xl font-semibold">Évolution mensuelle</h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            12 derniers mois · Corrèze + Dordogne
          </p>
        </div>
        <div className="flex gap-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-hornet" /> Signalés
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-success" /> Détruits
          </span>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 6, bottom: 0, left: -16 }}>
            <defs>
              <linearGradient id="gSig" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.82 0.165 82)" stopOpacity={0.55} />
                <stop offset="100%" stopColor="oklch(0.82 0.165 82)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gDes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.5 0.13 148)" stopOpacity={0.45} />
                <stop offset="100%" stopColor="oklch(0.5 0.13 148)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="oklch(0.88 0.012 75)" strokeDasharray="2 4" vertical={false} />
            <XAxis
              dataKey="mois"
              stroke="oklch(0.45 0.01 60)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="oklch(0.45 0.01 60)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "oklch(1 0 0)",
                border: "1px solid oklch(0.88 0.012 75)",
                borderRadius: 8,
                fontSize: 12,
                fontFamily: "JetBrains Mono",
              }}
              cursor={{ stroke: "oklch(0.88 0.012 75)", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="signales"
              stroke="oklch(0.82 0.165 82)"
              strokeWidth={2}
              fill="url(#gSig)"
              name="Signalés"
            />
            <Area
              type="monotone"
              dataKey="detruits"
              stroke="oklch(0.5 0.13 148)"
              strokeWidth={2}
              fill="url(#gDes)"
              name="Détruits"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
