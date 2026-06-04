
DROP POLICY "Public can insert signalements" ON public.signalements;

CREATE POLICY "Public can insert signalements"
  ON public.signalements
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(adresse) BETWEEN 1 AND 500
    AND length(code_postal) BETWEEN 4 AND 10
    AND length(declarant_prenom) BETWEEN 1 AND 100
    AND length(declarant_nom) BETWEEN 1 AND 100
    AND length(declarant_email) BETWEEN 5 AND 320
    AND declarant_email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
    AND (commune_nom IS NULL OR length(commune_nom) <= 200)
    AND (commune_slug IS NULL OR length(commune_slug) <= 200)
    AND (hauteur IS NULL OR length(hauteur) <= 50)
    AND (diametre IS NULL OR length(diametre) <= 50)
    AND (photo_url IS NULL OR length(photo_url) <= 2000)
    AND moderation_status = 'pending'
  );
