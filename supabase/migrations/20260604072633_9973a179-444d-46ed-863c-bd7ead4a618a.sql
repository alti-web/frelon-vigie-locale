
-- Enums
CREATE TYPE public.signalement_type AS ENUM ('primaire', 'secondaire', 'piege', 'attaque-rucher');
CREATE TYPE public.signalement_statut AS ENUM ('signale', 'confirme', 'detruit');
CREATE TYPE public.signalement_profil AS ENUM ('habitant', 'apiculteur', 'mairie', 'desinsectiseur');
CREATE TYPE public.signalement_departement AS ENUM ('19', '24');
CREATE TYPE public.signalement_moderation AS ENUM ('pending', 'approved', 'rejected');

-- Table
CREATE TABLE public.signalements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Localisation
  adresse TEXT NOT NULL,
  code_postal TEXT NOT NULL,
  commune_nom TEXT,
  commune_slug TEXT,
  departement public.signalement_departement NOT NULL,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  -- Nid
  type public.signalement_type NOT NULL,
  hauteur TEXT,
  diametre TEXT,
  photo_url TEXT,
  statut public.signalement_statut NOT NULL DEFAULT 'signale',
  -- Déclarant (PII)
  declarant_prenom TEXT NOT NULL,
  declarant_nom TEXT NOT NULL,
  declarant_email TEXT NOT NULL,
  declarant_profil public.signalement_profil NOT NULL DEFAULT 'habitant',
  -- Modération
  moderation_status public.signalement_moderation NOT NULL DEFAULT 'pending',
  -- Méta
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index utiles
CREATE INDEX idx_signalements_dep ON public.signalements(departement);
CREATE INDEX idx_signalements_commune ON public.signalements(commune_slug);
CREATE INDEX idx_signalements_created ON public.signalements(created_at DESC);
CREATE INDEX idx_signalements_moderation ON public.signalements(moderation_status);

-- Vue publique : exclut les PII et ne liste que les signalements approuvés
CREATE VIEW public.signalements_public
WITH (security_invoker=on) AS
  SELECT
    id,
    commune_nom,
    commune_slug,
    departement,
    lat,
    lng,
    type,
    hauteur,
    diametre,
    statut,
    created_at
  FROM public.signalements
  WHERE moderation_status = 'approved';

-- Grants
GRANT INSERT ON public.signalements TO anon, authenticated;
GRANT ALL ON public.signalements TO service_role;
GRANT SELECT ON public.signalements_public TO anon, authenticated;
GRANT ALL ON public.signalements_public TO service_role;

-- RLS
ALTER TABLE public.signalements ENABLE ROW LEVEL SECURITY;

-- Insertion publique autorisée (formulaire de signalement anonyme)
CREATE POLICY "Public can insert signalements"
  ON public.signalements
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Aucune lecture directe sur la table : tout passe par la vue publique (sans PII)
CREATE POLICY "No direct read access"
  ON public.signalements
  FOR SELECT
  TO anon, authenticated
  USING (false);

-- Trigger updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_signalements_updated_at
  BEFORE UPDATE ON public.signalements
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
