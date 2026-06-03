import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { COMMUNES } from "@/lib/data/communes";
import { ACTUALITES } from "@/lib/data/actualites";

const BASE_URL = "https://www.observatoire-du-frelon.fr";

const GUIDES = [
  "reconnaitre-frelon-asiatique-europeen",
  "que-faire-piqure-frelon-asiatique",
  "protocole-destruction-nid",
  "piegeage-printanier-correze",
  "proteger-ruches-dordogne",
];

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "daily", priority: "1.0" },
          { path: "/cartographie", changefreq: "daily", priority: "0.9" },
          { path: "/signaler-un-nid", changefreq: "monthly", priority: "0.9" },
          { path: "/actualites", changefreq: "daily", priority: "0.8" },
          { path: "/guides", changefreq: "weekly", priority: "0.8" },
          { path: "/donnees", changefreq: "weekly", priority: "0.7" },
          { path: "/correze-19", changefreq: "daily", priority: "0.8" },
          { path: "/dordogne-24", changefreq: "daily", priority: "0.8" },
          { path: "/a-propos", changefreq: "monthly", priority: "0.5" },
          { path: "/contact", changefreq: "monthly", priority: "0.5" },
          { path: "/mentions-legales", changefreq: "yearly", priority: "0.3" },
          { path: "/rgpd", changefreq: "yearly", priority: "0.3" },
          { path: "/accessibilite", changefreq: "yearly", priority: "0.3" },
        ];

        for (const a of ACTUALITES) {
          entries.push({ path: `/actualites/${a.slug}`, changefreq: "monthly", priority: "0.7" });
        }
        for (const g of GUIDES) {
          entries.push({ path: `/guides/${g}`, changefreq: "monthly", priority: "0.7" });
        }
        for (const c of COMMUNES) {
          const dep = c.departement === "19" ? "correze-19" : "dordogne-24";
          entries.push({ path: `/${dep}/${c.slug}`, changefreq: "weekly", priority: "0.7" });
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
