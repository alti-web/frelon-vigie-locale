// Contenu rédactionnel détaillé par guide
// Chaque guide est une suite de blocs typés rendus côté composant.

export type Bloc =
  | { type: "para"; texte: string }
  | { type: "h2"; texte: string }
  | { type: "h3"; texte: string }
  | { type: "liste"; items: string[] }
  | { type: "ordered"; items: string[] }
  | { type: "encadre"; titre: string; texte: string; ton?: "info" | "alerte" | "succes" }
  | { type: "citation"; texte: string; auteur: string };

export const GUIDE_CONTENT: Record<string, Bloc[]> = {
  "reconnaitre-frelon-asiatique-europeen": [
    {
      type: "para",
      texte:
        "Chaque automne, les mairies de Corrèze et de Dordogne reçoivent des dizaines de signalements de nids de frelons européens (Vespa crabro) confondus avec ceux du frelon asiatique (Vespa velutina nigrithorax). Cette confusion conduit à des destructions inutiles d'une espèce protégée et utile à l'écosystème. Voici la méthode utilisée par les techniciens FREDON pour trancher en moins de trente secondes.",
    },
    { type: "h2", texte: "1. La couleur des pattes : critère n°1" },
    {
      type: "para",
      texte:
        "C'est le critère le plus fiable et le plus rapide. Le frelon asiatique présente une extrémité de pattes jaune vif, très contrastée. Le frelon européen, lui, a des pattes entièrement brun-rougeâtre. Une simple photo prise à 3 mètres permet souvent de trancher.",
    },
    { type: "h2", texte: "2. La couleur du thorax" },
    {
      type: "para",
      texte:
        "Le thorax du frelon asiatique est entièrement noir mat. Celui du frelon européen est rayé de brun et de jaune, plus clair, plus lumineux. Vu de dos, le contraste est immédiat.",
    },
    { type: "h2", texte: "3. La taille" },
    {
      type: "liste",
      items: [
        "Frelon asiatique (ouvrière) : 17 à 25 mm",
        "Frelon européen (ouvrière) : 25 à 35 mm",
        "Reine fondatrice asiatique : 30 mm maximum",
        "Reine fondatrice européenne : jusqu'à 40 mm",
      ],
    },
    {
      type: "para",
      texte:
        "Le frelon européen est nettement plus gros, avec un vol bruyant et lourd. Le frelon asiatique vole en stationnaire devant les ruches, comportement très caractéristique pour les apiculteurs.",
    },
    { type: "h2", texte: "4. La forme et l'emplacement du nid" },
    {
      type: "para",
      texte:
        "Le nid de Vespa velutina est sphérique ou en forme de poire, avec une entrée latérale (et non par le bas comme le frelon européen). Il est le plus souvent situé à grande hauteur, en haut d'un arbre, parfois sous une avancée de toit. Le nid de Vespa crabro, plus petit, est généralement caché : tronc creux, cabanon, grenier, avec entrée par le bas.",
    },
    {
      type: "encadre",
      titre: "Bon réflexe en Corrèze & Dordogne",
      ton: "info",
      texte:
        "Avant de signaler ou de faire détruire, photographiez le nid à distance et un individu si possible. Les techniciens GDSA 19 et 24 acceptent volontiers les photos par messagerie pour confirmer l'identification.",
    },
    { type: "h2", texte: "5. Le comportement aux abords de la ruche" },
    {
      type: "para",
      texte:
        "C'est l'indice qui ne trompe jamais les apiculteurs : le frelon asiatique pratique le vol stationnaire face aux planches d'envol, à 30-50 cm, attendant qu'une butineuse rentre pour la capturer en plein vol. Aucun autre hyménoptère ne présente ce comportement de chasse.",
    },
    { type: "h2", texte: "Et en cas de doute ?" },
    {
      type: "para",
      texte:
        "Le service de l'Observatoire propose une vérification photo gratuite sous 24 h. Joignez 2 ou 3 photos à votre signalement : un cliché du nid, un cliché d'un individu, un cliché d'environnement (l'arbre ou le bâtiment). C'est suffisant pour valider l'identification.",
    },
  ],

  "que-faire-piqure-frelon-asiatique": [
    {
      type: "para",
      texte:
        "Contrairement à une idée reçue, la piqûre de frelon asiatique n'est pas plus venimeuse que celle d'une guêpe ou d'une abeille. Le venin est même légèrement moins toxique en quantité égale. Le danger réel est ailleurs : agressivité de défense du nid (piqûres multiples), risque allergique, et localisation (visage, cou).",
    },
    {
      type: "encadre",
      titre: "Urgence vitale",
      ton: "alerte",
      texte:
        "Composez immédiatement le 15 (SAMU) en cas de piqûre au visage, au cou, dans la bouche, ou si la personne présente : essoufflement, gonflement du visage ou de la gorge, malaise, urticaire généralisé, vomissements. N'attendez pas l'aggravation.",
    },
    { type: "h2", texte: "Une piqûre isolée chez un adulte non allergique" },
    { type: "ordered", items: [
      "Éloignez-vous calmement de la zone : le frelon asiatique signale par phéromones, ses congénères peuvent attaquer en groupe.",
      "Retirez bagues et bracelets si la piqûre est à la main : l'œdème va apparaître dans les minutes qui suivent.",
      "Appliquez une source de chaleur (briquet à 5 cm de la peau quelques secondes, ou eau très chaude tolérable) : la chaleur dénature le venin.",
      "Désinfectez avec un antiseptique cutané standard.",
      "Appliquez du froid (poche de glace dans un linge) pour limiter l'œdème et la douleur.",
      "Surveillez pendant 30 minutes les signes allergiques.",
    ]},
    { type: "h2", texte: "Piqûres multiples (5 ou plus)" },
    {
      type: "para",
      texte:
        "Au-delà de cinq piqûres, le risque de toxicité du venin devient significatif, indépendamment de toute allergie. Consultez un médecin sans délai, ou les urgences si plus de dix piqûres ou si l'état se dégrade. Un enfant ou une personne âgée doit être vu pour seulement 2 ou 3 piqûres.",
    },
    { type: "h2", texte: "Personnes à risque" },
    {
      type: "liste",
      items: [
        "Allergiques connus aux hyménoptères (port de l'Anapen / Epipen impératif)",
        "Femmes enceintes (toute piqûre justifie un avis médical)",
        "Enfants de moins de 6 ans",
        "Personnes sous bêtabloquants ou IEC",
        "Personnes ayant déjà fait une réaction généralisée à une piqûre antérieure",
      ],
    },
    { type: "h2", texte: "Numéros utiles en Corrèze et Dordogne" },
    { type: "liste", items: [
      "SAMU : 15 (depuis un fixe ou mobile)",
      "Pompiers : 18 ou 112",
      "Centre antipoison de Bordeaux (24/24) : 05 56 96 40 80",
      "Centre antipoison de Toulouse (24/24) : 05 61 77 74 47",
    ]},
    {
      type: "encadre",
      titre: "Allergique connu : la trousse",
      ton: "info",
      texte:
        "Si vous êtes allergique aux hyménoptères, gardez en permanence avec vous : votre stylo auto-injecteur d'adrénaline (vérifiez la date), un antihistaminique oral, votre carte d'allergique, et le numéro du médecin allergologue référent.",
    },
  ],

  "protocole-destruction-nid": [
    {
      type: "para",
      texte:
        "La destruction d'un nid de frelon asiatique relève d'un professionnel formé. Tenter une intervention soi-même expose à des piqûres multiples et n'élimine que rarement la colonie. Voici comment se déroule, étape par étape, une intervention réalisée par un désinsectiseur agréé en Corrèze ou en Dordogne.",
    },
    { type: "h2", texte: "Étape 1 — Signalement et diagnostic à distance" },
    {
      type: "para",
      texte:
        "Après votre signalement, l'intervenant analyse vos photos et la fiche pour estimer la hauteur, l'accessibilité, le type de nid (primaire au printemps ou secondaire en été-automne) et le matériel nécessaire. Cette étape évite les déplacements inutiles et permet de devis précis.",
    },
    { type: "h2", texte: "Étape 2 — Choix du matériel" },
    { type: "liste", items: [
      "Perche télescopique : nids jusqu'à 18-20 m, méthode standard.",
      "Nacelle : nids très hauts ou en bordure de voirie, intervention plus longue (autorisation de stationnement).",
      "Drone pulvérisateur : technologie émergente, utilisée par quelques opérateurs en 2025-2026 pour les nids isolés en hauteur.",
      "Approche à pied : uniquement pour les nids primaires bas (au printemps).",
    ]},
    { type: "h2", texte: "Étape 3 — Injection du biocide" },
    {
      type: "para",
      texte:
        "Le produit utilisé est généralement à base de perméthrine, injecté directement dans le nid via une lance. La colonie est neutralisée en quelques minutes. Le nid est laissé en place pour que les frelons absents au moment de l'intervention reviennent et soient eux aussi exposés.",
    },
    { type: "h2", texte: "Étape 4 — Décrochage du nid (optionnel)" },
    {
      type: "para",
      texte:
        "Le décrochage n'est pas obligatoire et représente un coût supplémentaire (souvent 30 à 50 € en plus). Il est recommandé sur les nids bas ou très visibles, par sécurité psychologique des riverains et pour éviter une réutilisation hypothétique.",
    },
    { type: "h2", texte: "Combien ça coûte en 2025-2026 ?" },
    { type: "liste", items: [
      "Nid bas (< 6 m) : 70 à 110 €",
      "Nid moyen (6 à 12 m) : 110 à 160 €",
      "Nid haut (12 à 20 m) : 160 à 220 €",
      "Intervention nacelle : +120 à +250 €",
      "Décrochage : +30 à +50 €",
    ]},
    {
      type: "encadre",
      titre: "Prise en charge",
      ton: "succes",
      texte:
        "En 2026, certaines communes du 19 et du 24 financent partiellement la destruction sur le domaine privé (souvent 50 % avec plafond). Renseignez-vous d'abord auprès de votre mairie : la liste évolue chaque année.",
    },
    { type: "h2", texte: "Et sur le domaine public ?" },
    {
      type: "para",
      texte:
        "Sur la voirie, dans un parc ou un bâtiment communal, l'intervention est entièrement prise en charge par la collectivité. Le signalement passe par la mairie qui mandate son prestataire conventionné.",
    },
  ],

  "piegeage-printanier-correze": [
    {
      type: "para",
      texte:
        "Le piégeage de printemps cible les fondatrices de Vespa velutina sortant d'hibernation entre février et mai. Une fondatrice piégée, c'est potentiellement un nid de plusieurs milliers d'individus en moins à l'automne suivant. Mais mal pratiqué, le piégeage massacre une biodiversité auxiliaire essentielle. Le protocole validé par la FREDON Nouvelle-Aquitaine privilégie la sélectivité.",
    },
    { type: "h2", texte: "La fenêtre de tir : 15 février — 30 avril en Corrèze" },
    {
      type: "para",
      texte:
        "Au-delà du 1er mai, les ouvrières des autres hyménoptères deviennent actives et le rapport bénéfice/dégât bascule. Le département de la Corrèze, plus froid et plus tardif que le sud Aquitaine, démarre généralement vers le 20 février sur Brive-la-Gaillarde et fin février-début mars en altitude (Plateau de Millevaches).",
    },
    { type: "h2", texte: "Modèles de pièges sélectifs recommandés" },
    { type: "liste", items: [
      "Piège VespaCatch (Véto-pharma) : référence du marché, sélectif, attractif spécifique.",
      "Piège Jabeprode : artisanal, libère les insectes non-cibles vivants, très utilisé par les GDSA.",
      "Pièges maison à cônes inversés : acceptables si les ouvertures sont bien calibrées (5,5 mm).",
    ]},
    {
      type: "encadre",
      titre: "À éviter absolument",
      ton: "alerte",
      texte:
        "Les pièges à bouteille bricolés sans cône de sortie tuent indistinctement guêpes communes, frelons européens, papillons, mouches pollinisatrices. Ce sont des destructeurs de biodiversité, à proscrire.",
    },
    { type: "h2", texte: "L'appât validé FREDON" },
    {
      type: "para",
      texte:
        "Recette de référence : 1/3 bière brune + 1/3 vin blanc (le vin repousse les abeilles) + 1/3 sirop de cassis. À renouveler tous les 8 à 10 jours. Évitez les mélanges trop sucrés en l'absence de vin blanc, qui attirent abeilles et bourdons.",
    },
    { type: "h2", texte: "Zones prioritaires en Corrèze" },
    { type: "liste", items: [
      "Couronne briviste : Brive, Malemort, Ussac, Saint-Pantaléon-de-Larche.",
      "Vallée de la Dordogne : Beaulieu, Argentat, Monceaux.",
      "Bassin de Tulle : Tulle, Naves, Laguenne.",
      "Tout site ayant accueilli un nid l'année précédente (rayon 800 m).",
    ]},
    { type: "h2", texte: "Densité et entretien" },
    {
      type: "para",
      texte:
        "Un piège tous les 100 à 150 m en zone connue ; à proximité immédiate des ruchers : 4 à 6 pièges par rucher. Visite hebdomadaire impérative pour relâcher les non-cibles encore vivants et renouveler l'appât.",
    },
  ],

  "proteger-ruches-dordogne": [
    {
      type: "para",
      texte:
        "La Dordogne fait partie des départements les plus exposés à la prédation par Vespa velutina depuis 2016. Aucune solution unique ne suffit : la protection des ruches repose sur une combinaison de dispositifs adaptés à la pression locale et à la période. Voici les pratiques validées par le GDSA 24 et les apiculteurs professionnels du Bergeracois et du Sarladais.",
    },
    { type: "h2", texte: "1. Muselières (réducteurs d'entrée)" },
    {
      type: "para",
      texte:
        "Premier réflexe dès les attaques observées. La muselière force le passage des butineuses dans un défilé qui empêche le frelon d'attraper en stationnaire. Modèles préférés en Dordogne : muselière à 5 trous calibrés, avec auvent. À installer dès juillet, à retirer en novembre.",
    },
    { type: "h2", texte: "2. Harpes électriques" },
    {
      type: "para",
      texte:
        "Dispositif autonome posé devant le rucher : des fils sous tension électrocutent les frelons en vol stationnaire sans toucher les abeilles. Très efficace en pression forte (Bergerac, Sarlat, Terrasson). Investissement : 350 à 600 € par harpe, alimentée par panneau solaire.",
    },
    {
      type: "encadre",
      titre: "Aide GDSA 24",
      ton: "succes",
      texte:
        "Le GDSA Dordogne propose chaque année une commande groupée de harpes électriques à tarif préférentiel pour ses adhérents. Inscription en janvier-février auprès du référent de votre canton.",
    },
    { type: "h2", texte: "3. Piégeage de protection" },
    {
      type: "para",
      texte:
        "À distinguer du piégeage de printemps : ici, on piège les ouvrières d'été-automne autour des ruchers (juillet à octobre). 4 à 6 pièges sélectifs par rucher, à 10-15 m des ruches. Effet limité s'il est isolé, mais efficace en complément d'autres dispositifs.",
    },
    { type: "h2", texte: "4. Destruction des nids dans un rayon de 1 km" },
    {
      type: "para",
      texte:
        "C'est l'action la plus efficace mais la plus exigeante : repérer activement les nids autour de vos ruchers et les faire détruire avant la production des nouvelles fondatrices (avant mi-octobre). Un nid détruit en septembre, c'est jusqu'à 200 fondatrices supprimées pour le printemps suivant.",
    },
    { type: "h2", texte: "5. Renforcer les colonies" },
    { type: "liste", items: [
      "Ne pas laisser de colonies faibles en zone à risque : elles s'effondrent.",
      "Surveiller les réserves en septembre-octobre : la pression frelon coupe les rentrées de nectar.",
      "Nourrir au sirop si nécessaire pour éviter la famine d'automne.",
    ]},
    {
      type: "encadre",
      titre: "Calendrier de protection en Dordogne",
      ton: "info",
      texte:
        "Février-avril : piégeage printanier. Juillet : pose des muselières. Août-septembre : harpes + piégeage de protection. Septembre-octobre : recherche et destruction de nids. Novembre : retrait des muselières et bilan de saison.",
    },
  ],
};

export const ACTU_CONTENT: Record<string, string[]> = {
  "nid-geant-beaulieu-sur-dordogne": [
    "Le signalement a été transmis lundi matin à l'Observatoire par un riverain de la place du Champ-de-Mars. Le nid, dissimulé jusqu'à la chute des premières feuilles, est désormais bien visible depuis la rue.",
    "Les mesures relevées par le désinsectiseur Apidestruct 19/24, mandaté par la mairie, font état d'un diamètre proche de 80 cm pour une hauteur d'environ 90 cm — soit un nid mature de fin de saison susceptible d'avoir produit plusieurs dizaines de nouvelles fondatrices.",
    "L'intervention est programmée mardi 6 h, avant la fréquentation diurne du centre-bourg. Une perche télescopique de 16 mètres sera utilisée. Un périmètre de sécurité de 30 mètres sera mis en place avec l'appui de la police municipale.",
    "Beaulieu-sur-Dordogne enregistre désormais 11 signalements sur les douze derniers mois, en progression de 37 % par rapport à 2024. Le secteur de la vallée concentre une part croissante de l'activité corrézienne.",
  ],
  "alerte-apicole-terrasson-3-ruchers": [
    "Trois apiculteurs des communes de Terrasson-Lavilledieu et Le Lardin-Saint-Lazare ont signalé en quinze jours des attaques massives sur leurs ruchers. Les pertes constatées vont de 20 à 40 % de l'effectif des butineuses sur les colonies les plus exposées.",
    "Le GDSA 24, à travers son référent Sarladais, a confirmé l'existence d'au moins deux nids actifs dans un rayon de 500 mètres autour de l'un des ruchers concernés. Une campagne de recherche est engagée avec l'appui des riverains.",
    "Recommandations immédiates : pose de muselières, mise en service des harpes électriques disponibles, et signalement de tout nid suspect à l'Observatoire ou directement à la mairie de la commune concernée.",
    "L'Observatoire mettra à jour quotidiennement la carte des signalements sur le secteur tant que la pression demeure forte.",
  ],
  "bergerac-record-signalements-octobre": [
    "Avec 18 nids signalés sur le seul mois d'octobre, Bergerac établit un nouveau record départemental pour un mois civil. Le précédent maximum, fixé en septembre 2023, était de 14 signalements.",
    "Les services techniques de la commune attribuent cette hausse à deux facteurs : une saison estivale longue et chaude propice à la croissance des colonies, et l'amélioration du dispositif de signalement déployé en septembre (formulaire en ligne et numéro dédié).",
    "Les quartiers les plus concernés : Naillac, La Madeleine, et le secteur des coteaux nord. La mairie a doublé son budget destruction pour le second semestre 2025 et étudie une convention avec deux désinsectiseurs supplémentaires pour 2026.",
    "Bergerac affiche désormais 61 signalements sur douze mois et conserve sa position de commune la plus impactée du département.",
  ],
  "piegeage-printanier-2026-correze": [
    "La FREDON Nouvelle-Aquitaine et le Conseil départemental de la Corrèze annoncent le déploiement d'une campagne coordonnée de piégeage printanier sur les communes les plus exposées du département à compter du 15 février 2026.",
    "Quinze communes pilotes ont été retenues, parmi lesquelles Brive-la-Gaillarde, Malemort, Tulle, Naves, Beaulieu-sur-Dordogne et Argentat-sur-Dordogne. Les pièges sélectifs (modèle VespaCatch) seront fournis aux mairies par lots de 30.",
    "Une formation gratuite est proposée aux référents communaux le 5 février à Brive et le 7 février à Tulle. Inscription via la FREDON ou directement auprès du GDSA 19.",
    "L'Observatoire publiera en continu sur cette page le bilan de la campagne, commune par commune, avec le nombre de fondatrices capturées.",
  ],
};
