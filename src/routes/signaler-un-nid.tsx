import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Camera, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { createSignalement } from "@/lib/signalements.functions";
import { sendEmailMessage } from "@/lib/email/emailjs";

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

type FormState = {
  adresse: string;
  codePostal: string;
  departement: "" | "19" | "24";
  type: "" | "primaire" | "secondaire" | "piege" | "attaque-rucher";
  hauteur: string;
  diametre: string;
  prenom: string;
  nom: string;
  email: string;
  profil: "habitant" | "apiculteur" | "mairie" | "desinsectiseur";
  consent: boolean;
};

const TYPES: { value: FormState["type"]; label: string }[] = [
  { value: "primaire", label: "Nid primaire" },
  { value: "secondaire", label: "Nid secondaire" },
  { value: "piege", label: "Piège" },
  { value: "attaque-rucher", label: "Attaque rucher" },
];

function SignalerPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submit = useServerFn(createSignalement);

  const [form, setForm] = useState<FormState>({
    adresse: "",
    codePostal: "",
    departement: "",
    type: "",
    hauteur: "",
    diametre: "",
    prenom: "",
    nom: "",
    email: "",
    profil: "habitant",
    consent: false,
  });

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  if (done) {
    return (
      <div className="container-edit max-w-xl py-24 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-success" strokeWidth={1.5} />
        <h1 className="mt-6 font-display text-4xl font-semibold">Signalement transmis</h1>
        <p className="mt-4 text-muted-foreground">
          Votre signalement a bien été enregistré. Il sera vérifié par notre équipe
          avant publication sur la carte publique.
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

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    if (!form.consent) {
      setError("Merci d'accepter la transmission du signalement.");
      return;
    }
    if (!form.departement || !form.type) {
      setError("Champs obligatoires manquants.");
      return;
    }

    setSubmitting(true);
    try {
      await submit({
        data: {
          adresse: form.adresse,
          codePostal: form.codePostal,
          departement: form.departement,
          type: form.type,
          hauteur: form.hauteur || null,
          diametre: form.diametre || null,
          prenom: form.prenom,
          nom: form.nom,
          email: form.email,
          profil: form.profil,
          communeNom: null,
          communeSlug: null,
          lat: null,
          lng: null,
        },
      });

      const message = [
        "=== Nouveau signalement de nid ===",
        `Type: ${form.type}`,
        `Département: ${form.departement}`,
        `Adresse: ${form.adresse}`,
        `Code postal: ${form.codePostal}`,
        `Hauteur: ${form.hauteur || "—"}`,
        `Diamètre: ${form.diametre || "—"}`,
        "",
        "--- Déclarant ---",
        `${form.prenom} ${form.nom} (${form.profil})`,
        `Email: ${form.email}`,
      ].join("\n");
      try {
        await sendEmailMessage(message);
      } catch (mailErr) {
        console.error("EmailJS notification failed:", mailErr);
      }

      setDone(true);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue. Réessayez dans un instant.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-edit max-w-2xl py-12">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-hornet">
        · Signalement
      </span>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
        Signaler un nid
      </h1>
      <p className="mt-3 text-muted-foreground">
        Trois étapes, deux minutes. Vos données sont transmises à l'équipe de
        l'Observatoire pour vérification avant publication.
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
        onSubmit={handleNext}
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
                maxLength={500}
                value={form.adresse}
                onChange={(e) => update("adresse", e.target.value)}
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
                  maxLength={10}
                  value={form.codePostal}
                  onChange={(e) => update("codePostal", e.target.value)}
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
                  value={form.departement}
                  onChange={(e) =>
                    update("departement", e.target.value as FormState["departement"])
                  }
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
                {TYPES.map((t) => (
                  <label
                    key={t.value}
                    className={`flex cursor-pointer items-center gap-2 rounded-md border bg-paper px-3 py-3 text-sm hover:border-hornet ${form.type === t.value ? "border-hornet" : "border-border"}`}
                  >
                    <input
                      type="radio"
                      name="type"
                      required
                      checked={form.type === t.value}
                      onChange={() => update("type", t.value)}
                      className="accent-hornet"
                    />
                    {t.label}
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
                  maxLength={50}
                  value={form.hauteur}
                  onChange={(e) => update("hauteur", e.target.value)}
                  placeholder="ex : 8 m"
                  className="mt-1 w-full rounded-md border border-border bg-paper px-4 py-3 text-sm outline-none focus:border-hornet"
                />
              </div>
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Diamètre
                </label>
                <input
                  maxLength={50}
                  value={form.diametre}
                  onChange={(e) => update("diametre", e.target.value)}
                  placeholder="ex : 45 cm"
                  className="mt-1 w-full rounded-md border border-border bg-paper px-4 py-3 text-sm outline-none focus:border-hornet"
                />
              </div>
            </div>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-border bg-paper px-4 py-6 text-sm font-medium text-muted-foreground hover:border-hornet hover:text-foreground"
            >
              <Camera className="h-4 w-4" /> Ajouter une photo (bientôt disponible)
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
                  maxLength={100}
                  value={form.prenom}
                  onChange={(e) => update("prenom", e.target.value)}
                  className="mt-1 w-full rounded-md border border-border bg-paper px-4 py-3 text-sm outline-none focus:border-hornet"
                />
              </div>
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Nom *
                </label>
                <input
                  required
                  maxLength={100}
                  value={form.nom}
                  onChange={(e) => update("nom", e.target.value)}
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
                maxLength={320}
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="mt-1 w-full rounded-md border border-border bg-paper px-4 py-3 text-sm outline-none focus:border-hornet"
              />
            </div>
            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Vous êtes
              </label>
              <select
                value={form.profil}
                onChange={(e) => update("profil", e.target.value as FormState["profil"])}
                className="mt-1 w-full rounded-md border border-border bg-paper px-4 py-3 text-sm outline-none focus:border-hornet"
              >
                <option value="habitant">Habitant</option>
                <option value="apiculteur">Apiculteur</option>
                <option value="mairie">Élu / agent municipal</option>
                <option value="desinsectiseur">Désinsectiseur</option>
              </select>
            </div>
            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                required
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
                className="mt-0.5 accent-hornet"
              />
              J'autorise l'Observatoire à enregistrer ce signalement et à le transmettre,
              le cas échéant, à la FREDON Nouvelle-Aquitaine et au GDSA du département concerné.
            </label>
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-md border border-alert/40 bg-alert/10 px-4 py-3 text-sm text-alert">
            {error}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            disabled={step === 1 || submitting}
            onClick={() => setStep(step - 1)}
            className="rounded-md border border-border bg-paper px-4 py-2.5 text-sm font-medium text-foreground disabled:opacity-30"
          >
            Précédent
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-md bg-hornet px-5 py-2.5 text-sm font-semibold text-hornet-foreground hover:bg-hornet/90 disabled:opacity-60"
          >
            {submitting ? (
              <>
                Envoi… <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
              </>
            ) : step < 3 ? (
              <>
                Continuer <Send className="h-4 w-4" strokeWidth={2.5} />
              </>
            ) : (
              <>
                Transmettre le signalement <Send className="h-4 w-4" strokeWidth={2.5} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
