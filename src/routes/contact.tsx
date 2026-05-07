import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, AlertTriangle, Newspaper, Users } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Observatoire du Frelon Asiatique Corrèze & Dordogne" },
      {
        name: "description",
        content:
          "Contacter l'Observatoire : presse, partenariats, signalements complexes, devenir référent local en Corrèze ou Dordogne.",
      },
      { property: "og:title", content: "Contacter l'Observatoire" },
      {
        property: "og:description",
        content: "Presse, partenariats, signalements complexes : nous écrire.",
      },
    ],
  }),
  component: ContactPage,
});

const CANAUX = [
  {
    icon: AlertTriangle,
    label: "Signalement urgent",
    detail: "Nid à proximité d'une école, d'un Ehpad ou d'un rucher.",
    action: "Utiliser le formulaire dédié",
    to: "/signaler-un-nid" as const,
    cta: true,
  },
  {
    icon: Newspaper,
    label: "Presse & médias",
    detail: "Demande d'interview, relecture d'article, transmission de visuels.",
    action: "presse@observatoire-frelon.fr",
  },
  {
    icon: Users,
    label: "Partenariat commune",
    detail: "Adhésion d'une mairie, intégration des données municipales.",
    action: "communes@observatoire-frelon.fr",
  },
  {
    icon: Mail,
    label: "Question générale",
    detail: "Identification d'insecte, demande de documentation, autre sujet.",
    action: "contact@observatoire-frelon.fr",
  },
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="container-edit max-w-5xl py-14">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-hornet">
        · Nous joindre
      </span>
      <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Nous répondons sous 48&nbsp;heures ouvrées. Pour signaler un nid, utilisez le
        formulaire dédié&nbsp;: il déclenche directement le circuit de traitement.
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2 space-y-3">
          {CANAUX.map((c) => (
            <div
              key={c.label}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/20"
            >
              <div className="flex items-start gap-3">
                <c.icon className="mt-0.5 h-4 w-4 text-hornet" strokeWidth={2} />
                <div className="flex-1">
                  <div className="font-display text-base font-semibold">{c.label}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{c.detail}</p>
                  {c.cta && c.to ? (
                    <Link
                      to={c.to}
                      className="mt-3 inline-flex rounded-md bg-hornet px-3 py-1.5 text-xs font-semibold text-hornet-foreground"
                    >
                      {c.action} →
                    </Link>
                  ) : (
                    <a
                      href={`mailto:${c.action}`}
                      className="mt-2 inline-block break-all font-mono text-xs text-foreground hover:text-hornet"
                    >
                      {c.action}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6 rounded-xl border border-border bg-paper p-5 text-sm">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Coordonnées
            </div>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-hornet" />
                <span className="font-mono text-foreground">05 55 00 00 00</span>
                <span className="text-xs">(lun–ven, 9h–17h)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 text-hornet" />
                <span>
                  Maison de la Biodiversité<br />
                  19000 Tulle · Corrèze
                </span>
              </li>
            </ul>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="md:col-span-3 space-y-5 rounded-2xl border border-border bg-card p-7"
        >
          {sent ? (
            <div className="rounded-lg border border-success/30 bg-success/5 p-5 text-sm">
              <div className="font-mono text-[10px] uppercase tracking-wider text-success">
                · Message envoyé
              </div>
              <p className="mt-2 text-foreground">
                Merci&nbsp;! Nous revenons vers vous sous 48&nbsp;h ouvrées à l'adresse
                indiquée.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Nom" name="nom" required />
                <Field label="Email" name="email" type="email" required />
              </div>
              <Field label="Organisation (optionnel)" name="org" />
              <div>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Sujet
                </label>
                <select className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm focus:border-hornet focus:outline-none">
                  <option>Demande générale</option>
                  <option>Demande presse</option>
                  <option>Partenariat commune</option>
                  <option>Devenir référent local</option>
                  <option>Donnée ouverte / API</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Message
                </label>
                <textarea
                  rows={6}
                  required
                  className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm focus:border-hornet focus:outline-none"
                />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                · Vos données ne sont utilisées que pour vous répondre. Voir la{" "}
                <Link to="/rgpd" className="link-editorial normal-case tracking-normal">
                  politique RGPD
                </Link>
                .
              </p>
              <button
                type="submit"
                className="w-full rounded-md bg-hornet px-5 py-3 text-sm font-semibold text-hornet-foreground hover:bg-hornet/90"
              >
                Envoyer le message
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm focus:border-hornet focus:outline-none"
      />
    </div>
  );
}
