import { cn } from "@/lib/utils";
import { formatNombre } from "@/lib/format";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatTileProps {
  label: string;
  value: number | string;
  unit?: string;
  trend?: string;
  variant?: "default" | "alert" | "success" | "ink";
  icon?: LucideIcon;
  delay?: number;
}

export function StatTile({
  label,
  value,
  unit,
  trend,
  variant = "default",
  icon: Icon,
  delay = 0,
}: StatTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "stat-tile",
        variant === "alert" && "tile-alert",
        variant === "success" && "tile-success",
        variant === "ink" && "tile-ink",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground/60" strokeWidth={1.5} />}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="num text-4xl font-semibold text-foreground md:text-5xl">
          {typeof value === "number" ? formatNombre(value) : value}
        </span>
        {unit && (
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {unit}
          </span>
        )}
      </div>
      {trend && (
        <div className="mt-2 font-mono text-[11px] text-muted-foreground">{trend}</div>
      )}
    </motion.div>
  );
}
