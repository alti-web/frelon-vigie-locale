export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      signalements: {
        Row: {
          adresse: string
          code_postal: string
          commune_nom: string | null
          commune_slug: string | null
          created_at: string
          declarant_email: string
          declarant_nom: string
          declarant_prenom: string
          declarant_profil: Database["public"]["Enums"]["signalement_profil"]
          departement: Database["public"]["Enums"]["signalement_departement"]
          diametre: string | null
          hauteur: string | null
          id: string
          lat: number | null
          lng: number | null
          moderation_status: Database["public"]["Enums"]["signalement_moderation"]
          photo_url: string | null
          statut: Database["public"]["Enums"]["signalement_statut"]
          type: Database["public"]["Enums"]["signalement_type"]
          updated_at: string
        }
        Insert: {
          adresse: string
          code_postal: string
          commune_nom?: string | null
          commune_slug?: string | null
          created_at?: string
          declarant_email: string
          declarant_nom: string
          declarant_prenom: string
          declarant_profil?: Database["public"]["Enums"]["signalement_profil"]
          departement: Database["public"]["Enums"]["signalement_departement"]
          diametre?: string | null
          hauteur?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          moderation_status?: Database["public"]["Enums"]["signalement_moderation"]
          photo_url?: string | null
          statut?: Database["public"]["Enums"]["signalement_statut"]
          type: Database["public"]["Enums"]["signalement_type"]
          updated_at?: string
        }
        Update: {
          adresse?: string
          code_postal?: string
          commune_nom?: string | null
          commune_slug?: string | null
          created_at?: string
          declarant_email?: string
          declarant_nom?: string
          declarant_prenom?: string
          declarant_profil?: Database["public"]["Enums"]["signalement_profil"]
          departement?: Database["public"]["Enums"]["signalement_departement"]
          diametre?: string | null
          hauteur?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          moderation_status?: Database["public"]["Enums"]["signalement_moderation"]
          photo_url?: string | null
          statut?: Database["public"]["Enums"]["signalement_statut"]
          type?: Database["public"]["Enums"]["signalement_type"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      signalements_public: {
        Row: {
          commune_nom: string | null
          commune_slug: string | null
          created_at: string | null
          departement:
            | Database["public"]["Enums"]["signalement_departement"]
            | null
          diametre: string | null
          hauteur: string | null
          id: string | null
          lat: number | null
          lng: number | null
          statut: Database["public"]["Enums"]["signalement_statut"] | null
          type: Database["public"]["Enums"]["signalement_type"] | null
        }
        Insert: {
          commune_nom?: string | null
          commune_slug?: string | null
          created_at?: string | null
          departement?:
            | Database["public"]["Enums"]["signalement_departement"]
            | null
          diametre?: string | null
          hauteur?: string | null
          id?: string | null
          lat?: number | null
          lng?: number | null
          statut?: Database["public"]["Enums"]["signalement_statut"] | null
          type?: Database["public"]["Enums"]["signalement_type"] | null
        }
        Update: {
          commune_nom?: string | null
          commune_slug?: string | null
          created_at?: string | null
          departement?:
            | Database["public"]["Enums"]["signalement_departement"]
            | null
          diametre?: string | null
          hauteur?: string | null
          id?: string | null
          lat?: number | null
          lng?: number | null
          statut?: Database["public"]["Enums"]["signalement_statut"] | null
          type?: Database["public"]["Enums"]["signalement_type"] | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      signalement_departement: "19" | "24"
      signalement_moderation: "pending" | "approved" | "rejected"
      signalement_profil:
        | "habitant"
        | "apiculteur"
        | "mairie"
        | "desinsectiseur"
      signalement_statut: "signale" | "confirme" | "detruit"
      signalement_type: "primaire" | "secondaire" | "piege" | "attaque-rucher"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      signalement_departement: ["19", "24"],
      signalement_moderation: ["pending", "approved", "rejected"],
      signalement_profil: [
        "habitant",
        "apiculteur",
        "mairie",
        "desinsectiseur",
      ],
      signalement_statut: ["signale", "confirme", "detruit"],
      signalement_type: ["primaire", "secondaire", "piege", "attaque-rucher"],
    },
  },
} as const
