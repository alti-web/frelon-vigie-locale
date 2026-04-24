import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, MapPin, Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/signaler-un-nid")({
  head: () => ({
    meta: [
      { title: "Signaler un nid de frelon asiatique — Corrèze & Dordogne" },
      {
        name: "description",
        content:
          "Formulaire officiel de signalement d'un nid de frelon asiatique en Corrèze (19) ou Dordogne (24). Géolocalisation et photo en 3 étapes.",
      },
      { property: "og:title", content: "Signaler un nid — Observatoire" },
      {
        property: "og:description",
        content: "Transmettez un signalement en moins de 2 minutes.",
      },
    ],
  }),
  component: SignalerPage,
});

function SignalerPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="container-edit max-w-xl py-24 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-success" strokeWidth={1.5} />
        <h1 className="mt-6 font-display text-4xl font-semibold">Signalement transmis</h1>
        <p className="mt-4 text-muted-foreground">
          Votre signalement a été enregistré et sera vérifié sous 24 h. Vous recevrez un
          courriel de confirmation, puis une notification dès qu'il sera traité par un
          désinsectiseur agréé.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-md bg-hornet px-5 py-3 font-semibold text-hornet-foreground"
        >
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="container-edit max-w-2xl py-12">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-hornet">
        · Signalement
      </span>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
        Signaler un nid
      </h1>
      <p className="mt-3 text-muted-foreground">
        Trois étapes, deux minutes. Vos données sont transmises à la FREDON et au GDSA du
        département concerné.
      </p>

      <div className="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <span
              className={`grid h-7 w-7 place-items-center rounded-full border ${step >= s ? "border-hornet bg-hornet text-hornet-foreground" : "border-border bg-card text-muted-foreground"}`}
            >
              {s}
            </span>
            {s < 3 && (
              <span className={`h-px flex-1 ${step > s ? "bg-hornet" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      <form
        className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-card md:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 3) setStep(step + 1);
          else setDone(true);
        }}
      >
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="font-display text-2xl font-semibold">1 · Localisation</h2>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-hornet/50 bg-hornet/5 px-4 py-4 text-sm font-medium text-foreground hover:bg-hornet/10"
            >
              <MapPin className="h-4 w-4 text-hornet" /> Utiliser ma position GPS
            </button>
            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Adresse / lieu-dit *
              </label>
              <input
                required
                placeholder="12 rue de la République, Brive-la-Gaillarde"
                className="mt-1 w-full rounded-md border border-border bg-paper px-4 py-3 text-sm outline-none focus:border-hornet"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Code postal *
                </label>
                <input
                  required
                  placeholder="19100"
                  className="mt-1 w-full rounded-md border border-border bg-paper px-4 py-3 text-sm outline-none focus:border-hornet"
                />
              </div>
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Département *
                </label>
                <select
                  required
                  className="mt-1 w-full rounded-md border border-border bg-paper px-4 py-3 text-sm outline-none focus:border-hornet"
                >
                  <option value="">—</option>
                  <option value="19">Corrèze (19)</option>
                  <option value="24">Dordogne (24)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="font-display text-2xl font-semibold">2 · Caractéristiques du nid</h2>
            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Type *
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {["Nid primaire", "Nid secondaire", "Piège", "Attaque rucher"].map((t) => (
                  <label
                    key={t}
                    className="flex cursor-pointer items-center gap-2 rounded-md border border-border bg-paper px-3 py-3 text-sm hover:border-hornet"
                  >
                    <input type="radio" name="type" required className="accent-hornet" />
                    {t}
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Hauteur estimée
                </label>
                <input
                  placeholder="ex : 8 m"
                  className="mt-1 w-full rounded-md border border-border bg-paper px-4 py-3 text-sm outline-none focus:border-hornet"
                />
              </div>
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Diamètre
                </label>
                <input
                  placeholder="ex : 45 cm"
                  className="mt-1 w-full rounded-md border border-border bg-paper px-4 py-3 text-sm outline-none focus:border-hornet"
                />
              </div>
            </div>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-border bg-paper px-4 py-6 text-sm font-medium text-muted-foreground hover:border-hornet hover:text-foreground"
            >
              <Camera className="h-4 w-4" /> Ajouter une photo (recommandé)
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="font-display text-2xl font-semibold">3 · Vos coordonnées</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Prénom *
                </label>
                <input
                  required
                  className="mt-1 w-full rounded-md border border-border bg-paper px-4 py-3 text-sm outline-none focus:border-hornet"
                />
              </div>
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Nom *
                </label>
                <input
                  required
                  className="mt-1 w-full rounded-md border border-border bg-paper px-4 py-3 text-sm outline-none focus:border-hornet"
                />
              </div>
            </div>
            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Email *
              </label>
              <input
                required
                type="email"
                className="mt-1 w-full rounded-md border border-border bg-paper px-4 py-3 text-sm outline-none focus:border-hornet"
              />
            </div>
            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Vous êtes
              </label>
              <select className="mt-1 w-full rounded-md border border-border bg-paper px-4 py-3 text-sm outline-none focus:border-hornet">
                <option>Habitant</option>
                <option>Apiculteur</option>
                <option>Élu / agent municipal</option>
                <option>Désinsectiseur</option>
              </select>
            </div>
            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" required className="mt-0.5 accent-hornet" />
              J'autorise la transmission de ce signalement à la FREDON Nouvelle-Aquitaine et
              au GDSA du département concerné.
            </label>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="rounded-md border border-border bg-paper px-4 py-2.5 text-sm font-medium text-foreground disabled:opacity-30"
          >
            Précédent
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-hornet px-5 py-2.5 text-sm font-semibold text-hornet-foreground hover:bg-hornet/90"
          >
            {step < 3 ? "Continuer" : "Transmettre le signalement"}
            <Send className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
      </form>
    </div>
  );
}
