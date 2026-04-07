import type { Bank } from "@/lib/types";

export const BANKS: Record<string, Bank> = {
  "bnp-paribas": {
    slug: "bnp-paribas",
    name: "BNP Paribas",
    bic: "BNPAFRPP",
    logo: "/banks/bnp-paribas.svg",
    isSupported: true,
    seoTitle: "Convertir un releve BNP Paribas en Excel & CSV",
    seoDescription:
      "Convertissez vos releves de compte BNP Paribas PDF en fichiers Excel et CSV en quelques secondes. Extraction automatique des transactions, format francais.",
    faq: [
      {
        question: "Comment convertir un releve BNP Paribas en Excel ?",
        answer:
          "Deposez simplement votre releve BNP Paribas PDF sur ReleveFacile. Notre outil detecte automatiquement le format BNP et extrait toutes vos transactions en quelques secondes.",
      },
      {
        question: "Quels formats de releve BNP sont compatibles ?",
        answer:
          "ReleveFacile est compatible avec tous les formats de releves BNP Paribas : releves mensuels, trimestriels, et releves de compte courant ou epargne.",
      },
      {
        question: "Comment telecharger un releve PDF depuis l'espace BNP Paribas ?",
        answer:
          "Connectez-vous a votre espace client BNP Paribas (Mes Comptes > Documents > Releves). Selectionnez le releve souhaite et cliquez sur l'icone de telechargement. Le PDF sera enregistre sur votre ordinateur, pret a etre depose sur ReleveFacile.",
      },
      {
        question: "Le format PDF de BNP Paribas pose-t-il des problemes particuliers ?",
        answer:
          "Les releves BNP Paribas utilisent un format PDF structure avec des tableaux bien definis, ce qui facilite l'extraction. ReleveFacile gere automatiquement les specificites comme les libelles sur plusieurs lignes, les operations en attente, et les totaux de page.",
      },
      {
        question: "Les releves BNP Net Entreprises sont-ils compatibles ?",
        answer:
          "Oui, ReleveFacile prend en charge les releves issus de BNP Paribas Net Entreprises ainsi que les releves des comptes professionnels. Le format est detecte automatiquement, que votre releve provienne de l'espace particulier ou professionnel.",
      },
    ],
  },
  "credit-agricole": {
    slug: "credit-agricole",
    name: "Credit Agricole",
    bic: "AGRIFRPP",
    logo: "/banks/credit-agricole.svg",
    isSupported: true,
    seoTitle: "Convertir un releve Credit Agricole en Excel & CSV",
    seoDescription:
      "Convertissez vos releves Credit Agricole PDF en Excel et CSV en quelques secondes. Compatible avec les 39 caisses regionales. Extraction automatique des transactions, dates et montants.",
    faq: [
      {
        question: "Les releves de toutes les caisses regionales sont-ils compatibles ?",
        answer:
          "Oui, ReleveFacile est compatible avec les releves de toutes les 39 caisses regionales du Credit Agricole (Ile-de-France, Centre Loire, Nord de France, Aquitaine, etc.). Le format PDF peut varier legerement d'une caisse a l'autre, mais notre outil detecte et gere ces differences automatiquement.",
      },
      {
        question: "Comment convertir un releve Credit Agricole en Excel ?",
        answer:
          "Deposez votre releve Credit Agricole PDF sur ReleveFacile. L'outil detecte automatiquement qu'il s'agit d'un releve Credit Agricole, extrait toutes les transactions (date, libelle, montant) et vous propose un fichier Excel ou CSV pret a l'emploi en quelques secondes.",
      },
      {
        question: "Comment telecharger un releve PDF depuis le Credit Agricole en ligne ?",
        answer:
          "Depuis votre espace client Credit Agricole, allez dans Mes Comptes > Documents > e-Releves. Selectionnez la periode souhaitee et cliquez sur le releve pour le telecharger au format PDF. Vous pouvez ensuite le deposer directement sur ReleveFacile.",
      },
      {
        question: "Quels formats de releve Credit Agricole sont pris en charge ?",
        answer:
          "ReleveFacile gere les releves de compte courant, les releves d'epargne (Livret A, LDD, PEL), et les releves de compte professionnel Credit Agricole. Les releves mensuels et trimestriels sont tous compatibles.",
      },
      {
        question: "Le format Credit Agricole pose-t-il des difficultes de lecture ?",
        answer:
          "Les releves Credit Agricole peuvent presenter des mises en page differentes selon la caisse regionale. ReleveFacile gere ces variations : libelles tronques, operations regroupees par date de valeur, et separations debit/credit specifiques au format CA.",
      },
    ],
  },
  "societe-generale": {
    slug: "societe-generale",
    name: "Societe Generale",
    bic: "SOGEFRPP",
    logo: "/banks/societe-generale.svg",
    isSupported: true,
    seoTitle: "Convertir un releve Societe Generale en Excel & CSV",
    seoDescription:
      "Convertissez vos releves Societe Generale PDF en fichiers Excel et CSV en quelques secondes. Extraction rapide et precise de vos transactions avec detection automatique du format SG.",
    faq: [
      {
        question: "Comment convertir un releve Societe Generale en Excel ?",
        answer:
          "Deposez votre releve Societe Generale au format PDF sur ReleveFacile. Notre outil reconnait automatiquement le format SG et extrait toutes vos operations (date, libelle, debit, credit) pour generer un fichier Excel ou CSV pret a l'emploi.",
      },
      {
        question: "Quels types de releves Societe Generale sont pris en charge ?",
        answer:
          "ReleveFacile prend en charge les releves de compte courant, les releves de compte joint, les releves d'epargne et les releves de compte professionnel Societe Generale. Les formats mensuels et trimestriels sont tous compatibles.",
      },
      {
        question: "Comment telecharger un releve PDF depuis l'espace Societe Generale ?",
        answer:
          "Connectez-vous a votre espace client SG (particuliers.sg.fr ou professionnels.sg.fr). Rendez-vous dans Mes Comptes > Documents > Releves de compte. Selectionnez la periode et cliquez sur le PDF pour le telecharger. Vous pouvez ensuite le convertir sur ReleveFacile.",
      },
      {
        question: "Les releves SG en ligne et les releves papier scannes sont-ils compatibles ?",
        answer:
          "ReleveFacile fonctionne de maniere optimale avec les releves PDF natifs telecharges depuis l'espace client SG. Les releves papier scannes peuvent donner des resultats moins precis car ils necessitent une reconnaissance optique (OCR) que notre outil n'effectue pas.",
      },
      {
        question: "Quels problemes courants rencontre-t-on avec les releves Societe Generale ?",
        answer:
          "Les releves SG utilisent parfois des libelles abreges et des references longues qui s'etendent sur plusieurs lignes. ReleveFacile reconstruit automatiquement ces libelles fragmentes et separe correctement les colonnes debit et credit, meme lorsque le formatage est dense.",
      },
    ],
  },
  lcl: {
    slug: "lcl",
    name: "LCL",
    bic: "CRLYFRPP",
    logo: "/banks/lcl.svg",
    isSupported: true,
    seoTitle: "Convertir un releve LCL en Excel & CSV",
    seoDescription:
      "Convertissez vos releves LCL (Le Credit Lyonnais) PDF en Excel et CSV. Gestion intelligente des libelles multi-lignes et extraction precise de toutes vos operations bancaires.",
    faq: [
      {
        question: "Comment convertir un releve LCL en Excel ?",
        answer:
          "Glissez-deposez votre releve LCL PDF sur ReleveFacile. L'outil detecte automatiquement le format LCL et extrait chaque transaction avec sa date d'operation, sa date de valeur, son libelle complet et son montant. Le fichier Excel ou CSV est genere en quelques secondes.",
      },
      {
        question: "Quels formats de releves LCL sont compatibles ?",
        answer:
          "ReleveFacile gere les releves de compte courant LCL, les releves de compte professionnel, et les releves d'epargne. Les releves mensuels telecharges depuis l'espace client LCL en ligne sont pris en charge, quel que soit le type de compte.",
      },
      {
        question: "Comment telecharger un releve PDF depuis l'espace LCL ?",
        answer:
          "Connectez-vous sur lcl.fr, puis allez dans Comptes > Documents > Releves de compte. Choisissez le compte et la periode, puis cliquez sur l'icone PDF pour telecharger. Le fichier est immediatement utilisable sur ReleveFacile.",
      },
      {
        question: "Pourquoi les libelles LCL sont-ils parfois tronques dans Excel ?",
        answer:
          "Les releves LCL ont des libelles qui s'etendent souvent sur 2 ou 3 lignes dans le PDF (references de virement, numeros de carte, etc.). ReleveFacile reconstruit intelligemment chaque libelle en une seule cellule dans le fichier Excel, sans perte d'information.",
      },
      {
        question: "Les releves LCL Banque Privee sont-ils compatibles ?",
        answer:
          "Oui, les releves LCL Banque Privee utilisent un format similaire aux releves LCL classiques. ReleveFacile les detecte et les convertit de la meme maniere, avec extraction de toutes les colonnes : date, libelle, debit, credit et solde.",
      },
    ],
  },
  "la-banque-postale": {
    slug: "la-banque-postale",
    name: "La Banque Postale",
    bic: "PSSTFRPP",
    logo: "/banks/la-banque-postale.svg",
    isSupported: true,
    seoTitle: "Convertir un releve La Banque Postale en Excel & CSV",
    seoDescription:
      "Convertissez vos releves La Banque Postale (ex-CCP) PDF en Excel et CSV en quelques secondes. Extraction automatique des operations, compatible compte courant et Livret A.",
    faq: [
      {
        question: "Comment convertir un releve La Banque Postale en Excel ?",
        answer:
          "Deposez votre releve La Banque Postale PDF sur ReleveFacile. Notre outil detecte automatiquement le format LBP et extrait toutes les operations avec leur date, libelle et montant. Vous obtenez un fichier Excel ou CSV exploitable immediatement dans votre comptabilite.",
      },
      {
        question: "Quels types de releves La Banque Postale sont pris en charge ?",
        answer:
          "ReleveFacile est compatible avec les releves de compte courant postal (CCP), les releves de Livret A, les releves de compte professionnel et les releves de compte joint La Banque Postale. Les releves mensuels et trimestriels sont tous geres.",
      },
      {
        question: "Comment telecharger un releve PDF depuis La Banque Postale en ligne ?",
        answer:
          "Connectez-vous sur labanquepostale.fr, puis allez dans Mes comptes > Documents > e-Releves. Selectionnez le compte et la periode. Cliquez sur le releve pour le telecharger en PDF. Vous pouvez ensuite le convertir instantanement sur ReleveFacile.",
      },
      {
        question: "Les anciens releves CCP (compte cheque postal) sont-ils compatibles ?",
        answer:
          "Les releves recents telecharges depuis l'espace en ligne La Banque Postale sont pleinement compatibles. Les anciens releves CCP anterieurs a la numerisation peuvent avoir un format different. Si vous avez un scan d'un ancien releve papier, la qualite d'extraction dependra de la lisibilite du PDF.",
      },
      {
        question: "Quelles specificites du format La Banque Postale ReleveFacile gere-t-il ?",
        answer:
          "Les releves La Banque Postale presentent des particularites comme les numeros de centre postal, les codes operations specifiques (VIR SEPA, PRLV, RET DAB) et les libelles parfois abreges. ReleveFacile reconstruit les libelles complets et categorise correctement chaque type d'operation.",
      },
    ],
  },
  boursorama: {
    slug: "boursorama",
    name: "Boursorama Banque",
    bic: "BOUSFRPP",
    logo: "/banks/boursorama.svg",
    isSupported: true,
    seoTitle: "Convertir un releve Boursorama en Excel & CSV",
    seoDescription:
      "Convertissez vos releves Boursorama Banque PDF en Excel et CSV. Extraction automatique des transactions, compatible avec tous les comptes Boursorama (Ultimate, Metal, Welcome).",
    faq: [
      {
        question: "Comment convertir un releve Boursorama en Excel ?",
        answer:
          "Deposez votre releve Boursorama Banque PDF sur ReleveFacile. L'outil detecte automatiquement le format Boursorama et extrait toutes les transactions (virements, prelevements, paiements carte) pour generer un fichier Excel ou CSV en quelques secondes.",
      },
      {
        question: "Quels formats de releves Boursorama sont compatibles ?",
        answer:
          "ReleveFacile prend en charge les releves de compte courant Boursorama (Welcome, Ultim, Metal), les releves de compte joint, les releves d'epargne (Livret, PEL) et les releves de compte-titres. Les releves mensuels telecharges depuis l'espace client sont tous compatibles.",
      },
      {
        question: "Comment telecharger un releve PDF depuis Boursorama ?",
        answer:
          "Connectez-vous sur boursorama-banque.com, puis allez dans Mon compte > Documents > Releves. Selectionnez le compte et le mois souhaite, puis cliquez sur le lien PDF pour telecharger le releve. Vous pouvez aussi utiliser l'application mobile Boursorama pour acceder a vos releves.",
      },
      {
        question: "Boursorama propose deja un export CSV, pourquoi utiliser ReleveFacile ?",
        answer:
          "L'export CSV natif de Boursorama couvre uniquement les 3 derniers mois et son format n'est pas toujours compatible avec les logiciels comptables francais (separateurs, format de date). ReleveFacile genere un fichier au format francais standard (separateur point-virgule, dates JJ/MM/AAAA, virgule decimale) et permet aussi l'export Excel avec mise en forme.",
      },
      {
        question: "Les releves Boursorama sont-ils faciles a extraire ?",
        answer:
          "Les releves PDF Boursorama ont une mise en page relativement claire avec des colonnes bien separees. ReleveFacile gere neanmoins les cas particuliers comme les virements instantanes, les operations carte regroupees, et les libelles longs qui s'etendent sur plusieurs lignes.",
      },
    ],
  },
  "banque-populaire": {
    slug: "banque-populaire",
    name: "Banque Populaire",
    bic: "CCBPFRPP",
    logo: "/banks/banque-populaire.svg",
    isSupported: true,
    seoTitle: "Convertir un releve Banque Populaire en Excel & CSV",
    seoDescription:
      "Convertissez vos releves Banque Populaire PDF en Excel et CSV en quelques secondes. Compatible avec toutes les banques regionales du reseau BPCE. Extraction automatique des transactions.",
    faq: [
      {
        question: "Comment convertir un releve Banque Populaire en Excel ?",
        answer:
          "Deposez votre releve Banque Populaire PDF sur ReleveFacile. Notre outil identifie automatiquement le format Banque Populaire et extrait toutes vos operations (date, libelle, montant debit/credit) pour generer un fichier Excel ou CSV exploitable immediatement.",
      },
      {
        question: "Les releves de toutes les Banques Populaires regionales sont-ils compatibles ?",
        answer:
          "Oui, ReleveFacile est compatible avec les releves de toutes les Banques Populaires regionales : BRED, Banque Populaire Rives de Paris, Grand Ouest, Auvergne-Rhone-Alpes, Mediterranee, Alsace Lorraine Champagne, et toutes les autres entites du reseau BPCE.",
      },
      {
        question: "Comment telecharger un releve PDF depuis Banque Populaire en ligne ?",
        answer:
          "Connectez-vous sur le site de votre Banque Populaire regionale (ex: bred.fr, bpgo.fr, etc.) ou sur l'application Banque Populaire. Rendez-vous dans Mes Comptes > Documents > Releves, selectionnez la periode et telechargez le PDF. Le fichier est ensuite pret pour la conversion sur ReleveFacile.",
      },
      {
        question: "Quels types de comptes Banque Populaire sont pris en charge ?",
        answer:
          "ReleveFacile gere les releves de comptes courants particuliers, les comptes professionnels et les comptes d'epargne Banque Populaire. Les formats de releves mensuels et trimestriels sont tous compatibles, y compris les releves de la BRED Banque Populaire.",
      },
      {
        question: "Les releves Banque Populaire ont-ils des specificites de format ?",
        answer:
          "Le format des releves PDF peut varier legerement d'une Banque Populaire regionale a l'autre (mise en page, police, disposition des colonnes). ReleveFacile gere ces variations et reconstruit correctement les transactions, y compris les libelles avec references SEPA longues et les operations carte bancaire regroupees.",
      },
    ],
  },
  "caisse-epargne": {
    slug: "caisse-epargne",
    name: "Caisse d'Epargne",
    bic: "CEPAFRPP",
    logo: "/banks/caisse-epargne.svg",
    isSupported: true,
    seoTitle: "Convertir un releve Caisse d'Epargne en Excel & CSV",
    seoDescription:
      "Convertissez vos releves Caisse d'Epargne PDF en Excel et CSV en quelques secondes. Compatible avec les 15 caisses regionales du reseau BPCE. Extraction automatique des transactions.",
    faq: [
      {
        question: "Comment convertir un releve Caisse d'Epargne en Excel ?",
        answer:
          "Deposez votre releve Caisse d'Epargne PDF sur ReleveFacile. L'outil detecte automatiquement le format Caisse d'Epargne et extrait toutes vos transactions pour generer un fichier Excel ou CSV, avec dates, libelles et montants correctement structures.",
      },
      {
        question: "Les releves de toutes les Caisses d'Epargne regionales sont-ils compatibles ?",
        answer:
          "Oui, ReleveFacile est compatible avec les releves des 15 Caisses d'Epargne regionales : Ile-de-France, Rhone-Alpes, Loire Drome Ardeche, Normandie, Cote d'Azur, et toutes les autres entites du groupe BPCE. Les differences de mise en page entre caisses sont gerees automatiquement.",
      },
      {
        question: "Comment telecharger un releve PDF depuis la Caisse d'Epargne en ligne ?",
        answer:
          "Connectez-vous sur caisse-epargne.fr ou sur l'application mobile Caisse d'Epargne. Allez dans Mes Comptes > Documents > e-Releves. Selectionnez le compte et la periode souhaitee, puis telechargez le releve au format PDF. Vous pouvez ensuite le convertir sur ReleveFacile.",
      },
      {
        question: "Quels types de comptes Caisse d'Epargne sont pris en charge ?",
        answer:
          "ReleveFacile gere les releves de compte courant, les releves de Livret A, les releves de compte professionnel et les releves de compte sur Livret (CSL) Caisse d'Epargne. Les releves mensuels et trimestriels sont tous compatibles.",
      },
      {
        question: "Les releves Caisse d'Epargne posent-ils des difficultes particulieres ?",
        answer:
          "Les releves Caisse d'Epargne peuvent contenir des operations avec des codes specifiques (VIR INST, PRLV SEPA, ECH PRET) et des references longues sur plusieurs lignes. ReleveFacile reconstruit les libelles complets et gere les particularites du format BPCE, notamment la separation debit/credit et les totaux intermediaires.",
      },
    ],
  },
  "credit-mutuel": {
    slug: "credit-mutuel",
    name: "Credit Mutuel",
    bic: "CMCIFRPP",
    logo: "/banks/credit-mutuel.svg",
    isSupported: true,
    seoTitle: "Convertir un releve Credit Mutuel en Excel & CSV",
    seoDescription: "Convertissez vos releves Credit Mutuel PDF en Excel et CSV.",
    faq: [],
  },
  fortuneo: {
    slug: "fortuneo",
    name: "Fortuneo",
    bic: "FTNOFRP1",
    logo: "/banks/fortuneo.svg",
    isSupported: true,
    seoTitle: "Convertir un releve Fortuneo en Excel & CSV",
    seoDescription: "Convertissez vos releves Fortuneo PDF en Excel et CSV.",
    faq: [],
  },
  "hello-bank": {
    slug: "hello-bank",
    name: "Hello bank!",
    bic: "BNPAFRPP",
    logo: "/banks/hello-bank.svg",
    isSupported: true,
    seoTitle: "Convertir un releve Hello bank! en Excel & CSV",
    seoDescription: "Convertissez vos releves Hello bank! PDF en Excel et CSV.",
    faq: [],
  },
  "cic": {
    slug: "cic",
    name: "CIC",
    bic: "CMCIFRPP",
    logo: "/banks/cic.svg",
    isSupported: true,
    seoTitle: "Convertir un releve CIC en Excel & CSV",
    seoDescription: "Convertissez vos releves CIC PDF en Excel et CSV.",
    faq: [],
  },
  hsbc: {
    slug: "hsbc",
    name: "HSBC France",
    bic: "CCFRFRPP",
    logo: "/banks/hsbc.svg",
    isSupported: false,
    seoTitle: "Convertir un releve HSBC France en Excel & CSV",
    seoDescription: "Convertissez vos releves HSBC France PDF en Excel et CSV.",
    faq: [],
  },
};

export const BANK_SLUGS = Object.keys(BANKS);

export const SUPPORTED_BANKS = Object.values(BANKS).filter((b) => b.isSupported);
