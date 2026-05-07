import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/rgpd")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité (RGPD) — Observatoire Frelon" },
      {
        name: "description",
        content:
          "Données collectées, finalités, durée de conservation et exercice de vos droits sur l'Observatoire du Frelon Asiatique 19/24.",
      },
    ],
  }),
  component: RgpdPage,
});

function RgpdPage() {
  return (
    <article className="container-edit max-w-3xl py-14">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-hornet">
        · Vie privée
      </span>
      <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight">
        Politique de confidentialité
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Conformité RGPD — révision du 7 mai 2026
      </p>

      <div className="mt-10 space-y-10 leading-relaxed text-foreground/90">
        <section>
          <h2 className="font-display text-2xl font-semibold">Responsable de traitement</h2>
          <p className="mt-3">
            L'association <strong>Observatoire du Frelon Asiatique 19/24</strong> est
            responsable des traitements opérés sur ce site. Déléguée à la protection des
            données&nbsp;: <em>dpo@observatoire-frelon.fr</em>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">Données collectées</h2>
          <table className="mt-4 w-full overflow-hidden rounded-xl border border-border text-sm">
            <thead className="bg-paper text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Donnée</th>
                <th className="px-4 py-3">Finalité</th>
                <th className="px-4 py-3">Conservation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <Row d="Email (alertes)" f="Envoi des alertes par commune" c="Jusqu'à désinscription" />
              <Row d="Coordonnées GPS du nid" f="Cartographie publique" c="12 mois après destruction" />
              <Row d="Photo du nid" f="Validation par référent" c="6 mois puis floutage" />
              <Row d="Email du déclarant" f="Retour de traitement" c="3 mois" />
              <Row d="IP & user-agent" f="Sécurité, anti-spam" c="48 heures" />
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">Base légale</h2>
          <p className="mt-3">
            Les traitements reposent sur (a) le <strong>consentement</strong> explicite pour
            les alertes et la newsletter, (b) l'<strong>intérêt légitime</strong> pour la
            cartographie publique des nids, conformément à l'article 6.1.f du RGPD, dans une
            finalité de santé publique et de protection apicole.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">Cookies</h2>
          <p className="mt-3">
            Le site n'utilise <strong>aucun cookie publicitaire</strong>. Seuls deux
            cookies fonctionnels sont déposés&nbsp;: <code>ofa_pref</code> (préférences
            d'affichage de la carte) et <code>ofa_session</code> (sécurité formulaire). Aucun
            traceur tiers, aucun pixel marketing.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">Sous-traitants</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-foreground/90 marker:text-hornet">
            <li>Lovable Cloud (hébergement, UE)</li>
            <li>OpenStreetMap (tuiles cartographiques, UE)</li>
            <li>Brevo (envoi d'emails transactionnels, UE)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">Vos droits</h2>
          <p className="mt-3">
            Vous disposez d'un droit d'accès, de rectification, d'effacement, de portabilité
            et d'opposition. Pour les exercer&nbsp;: <strong>dpo@observatoire-frelon.fr</strong>.
            Réponse sous 30&nbsp;jours. En cas de réponse insatisfaisante, vous pouvez saisir
            la <a href="https://www.cnil.fr" target="_blank" rel="noreferrer" className="link-editorial">CNIL</a>.
          </p>
        </section>
      </div>
    </article>
  );
}

function Row({ d, f, c }: { d: string; f: string; c: string }) {
  return (
    <tr>
      <td className="px-4 py-3 font-medium">{d}</td>
      <td className="px-4 py-3 text-muted-foreground">{f}</td>
      <td className="px-4 py-3 font-mono text-xs text-foreground">{c}</td>
    </tr>
  );
}
