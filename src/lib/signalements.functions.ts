import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SignalementSchema = z.object({
  adresse: z.string().trim().min(1).max(500),
  codePostal: z
    .string()
    .trim()
    .min(4)
    .max(10)
    .regex(/^[0-9A-Za-z\- ]+$/),
  communeNom: z.string().trim().max(200).optional().nullable(),
  communeSlug: z
    .string()
    .trim()
    .max(200)
    .regex(/^[a-z0-9\-]*$/)
    .optional()
    .nullable(),
  departement: z.enum(["19", "24"]),
  lat: z.number().min(-90).max(90).optional().nullable(),
  lng: z.number().min(-180).max(180).optional().nullable(),
  type: z.enum(["primaire", "secondaire", "piege", "attaque-rucher"]),
  hauteur: z.string().trim().max(50).optional().nullable(),
  diametre: z.string().trim().max(50).optional().nullable(),
  prenom: z.string().trim().min(1).max(100),
  nom: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(320),
  profil: z.enum(["habitant", "apiculteur", "mairie", "desinsectiseur"]),
});

export type SignalementInput = z.infer<typeof SignalementSchema>;

export const createSignalement = createServerFn({ method: "POST" })
  .inputValidator((input) => SignalementSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );

    const { data: row, error } = await supabaseAdmin
      .from("signalements")
      .insert({
        adresse: data.adresse,
        code_postal: data.codePostal,
        commune_nom: data.communeNom ?? null,
        commune_slug: data.communeSlug ?? null,
        departement: data.departement,
        lat: data.lat ?? null,
        lng: data.lng ?? null,
        type: data.type,
        hauteur: data.hauteur ?? null,
        diametre: data.diametre ?? null,
        declarant_prenom: data.prenom,
        declarant_nom: data.nom,
        declarant_email: data.email,
        declarant_profil: data.profil,
        statut: "signale",
        moderation_status: "pending",
      })
      .select("id")
      .single();

    if (error) {
      console.error("[createSignalement] insert error:", error);
      throw new Error(
        "Impossible d'enregistrer le signalement pour le moment. Réessayez dans un instant.",
      );
    }

    return { id: row.id, ok: true as const };
  });
