import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, Users, ShieldCheck, Database, Newspaper, MapPin } from "lucide-react";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Observatoire du Frelon Asiatique Corrèze & Dordogne" },
      {
        name: "description",
        content:
          "Mission, gouvernance, méthodologie et partenaires de l'Observatoire indépendant du frelon asiatique en Corrèze et Dordogne.",
      },
      { property: "og:title", content: "À propos de l'Observatoire" },
      {
        property: "og:description",
        content:
          "Plateforme indépendante de veille citoyenne sur le frelon asiatique, en lien avec les FREDON et GDSA.",
      },
    ],
  }),
  component: AProposPage,
});

const PILIERS = [
  {
    icon: Eye,
    titre: "Veille terrain",
    texte:
      "Recoupement quotidien des signalements citoyens, des interventions de désinsectiseurs agréés et des observations apicoles.",
  },
  {
    icon: Database,
    titre: "Données ouvertes",
    texte:
      "Tous nos jeux de données sont publiés sous licence ODbL, exportables en CSV, GeoJSON et JSON, accessibles via API publique.",
  },
  {
    icon: Newspaper,
    titre: "Information vérifiée",
    texte:
      "Chaque actualité est sourcée et recoupée auprès de la FREDON Nouvelle-Aquitaine, des GDSA 19/24 et des services municipaux.",
  },
  {
    icon: ShieldCheck,
    titre: "Indépendance éditoriale",
    texte:
      "L'Observatoire n'est financé par aucun désinsectiseur ni vendeur de pièges. Aucune publicité, aucun affiliate.",
  },
];

const PARTENAIRES = [
  { nom: "FREDON Nouvelle-Aquitaine", role: "Méthodologie & validation scientifique" },
  { nom: "GDSA Corrèze", role: "Réseau apicole départemental 19" },
  { nom: "GDSA Dordogne", role: "Réseau apicole départemental 24" },
  { nom: "Préfectures 19 & 24", role: "Coordination des arrêtés et plans de lutte" },
  { nom: "Communes adhérentes", role: "Remontée des interventions municipales" },
  { nom: "MNHN — INPN", role: "Référentiel taxonomique Vespa velutina" },
];

function AProposPage() {
  return (
    <div className="container-edit max-w-5xl py-14">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-hornet">
        · Notre mission
      </span>
      <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight md:text-6xl">
        Une vigie citoyenne, indépendante et locale.
      </h1>
      <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
        L'Observatoire du Frelon Asiatique centralise, vérifie et redistribue les signalements
        de nids de <em>Vespa velutina</em> en Corrèze et en Dordogne. Notre mission&nbsp;:
        donner à chaque habitant, apiculteur, élu ou désinsectiseur l'information précise dont
        il a besoin, au moment où il en a besoin.
      </p>

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        {PILIERS.map((p) => (
          <div key={p.titre} className="rounded-xl border border-border bg-card p-6">
            <p.icon className="h-5 w-5 text-hornet" strokeWidth={1.75} />
            <h2 className="mt-4 font-display text-xl font-semibold">{p.titre}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.texte}</p>
          </div>
        ))}
      </div>

      <section className="mt-20">
        <h2 className="font-display text-3xl font-semibold tracking-tight">
          Méthodologie
        </h2>
        <div className="mt-6 space-y-5 text-foreground/90 leading-relaxed">
          <p>
            Chaque signalement reçu via le formulaire est horodaté, géolocalisé et confronté à
            la base existante. Un premier filtre algorithmique élimine les doublons à moins de
            150&nbsp;m d'un nid déjà connu. Les photographies sont examinées par un référent
            apicole dans un délai moyen de 36&nbsp;heures pour confirmer l'espèce.
          </p>
          <p>
            Les statuts évoluent en quatre temps&nbsp;: <strong>signalé</strong> (déclaration
            citoyenne brute), <strong>confirmé</strong> (espèce validée par photo ou
            visite), <strong>programmé</strong> (intervention planifiée par un désinsectiseur
            agréé), <strong>détruit</strong> (preuve d'intervention reçue). Les nids classés
            « détruit » restent visibles 12&nbsp;mois sur la cartographie pour analyse
            saisonnière.
          </p>
          <p>
            Les données municipales sont rapatriées chaque nuit auprès des communes adhérentes
            via un connecteur sécurisé. Pour les communes non adhérentes, nous consolidons les
            comptes-rendus mensuels publiés par les services techniques.
          </p>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-3xl font-semibold tracking-tight">
          Gouvernance
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-paper p-6">
            <Users className="h-5 w-5 text-hornet" strokeWidth={1.75} />
            <h3 className="mt-3 font-display text-lg font-semibold">Comité éditorial</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Trois apiculteurs, un vétérinaire, un journaliste local, un technicien FREDON.
              Réunion mensuelle, comptes-rendus publics.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-paper p-6">
            <ShieldCheck className="h-5 w-5 text-hornet" strokeWidth={1.75} />
            <h3 className="mt-3 font-display text-lg font-semibold">Comité scientifique</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Validation des protocoles de piégeage, revue des guides pratiques deux fois par
              an et arbitrage des controverses méthodologiques.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-paper p-6">
            <MapPin className="h-5 w-5 text-hornet" strokeWidth={1.75} />
            <h3 className="mt-3 font-display text-lg font-semibold">Réseau de référents</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Un référent par canton, formé à l'identification photographique et au dialogue
              avec les déclarants.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-3xl font-semibold tracking-tight">Partenaires</h2>
        <ul className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
          {PARTENAIRES.map((p) => (
            <li key={p.nom} className="flex items-center justify-between gap-4 px-5 py-4">
              <span className="font-medium">{p.nom}</span>
              <span className="text-right font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {p.role}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16 rounded-2xl border border-border bg-ink p-8 text-cream">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-hornet">
          · Vous voulez contribuer ?
        </div>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
          Devenez référent local
        </h2>
        <p className="mt-3 max-w-2xl text-cream/80">
          Apiculteur, élu, naturaliste&nbsp;: rejoignez le réseau de référents cantonaux.
          Formation gratuite en demi-journée, organisée à Brive et à Périgueux deux fois par
          an.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-flex rounded-md bg-hornet px-5 py-3 text-sm font-semibold text-hornet-foreground hover:bg-hornet/90"
        >
          Nous écrire →
        </Link>
      </div>
    </div>
  );
}
