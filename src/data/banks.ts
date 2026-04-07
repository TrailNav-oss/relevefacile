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
    seoDescription:
      "Convertissez vos releves Credit Mutuel PDF en Excel et CSV en quelques secondes. Compatible avec toutes les federations regionales (Arkea, Alliance Federale). Extraction automatique des operations.",
    faq: [
      {
        question: "Comment convertir un releve Credit Mutuel en Excel ?",
        answer:
          "Deposez votre releve Credit Mutuel au format PDF sur ReleveFacile. L'outil reconnait automatiquement le format Credit Mutuel et extrait chaque operation (date, libelle, debit, credit) pour generer un fichier Excel ou CSV pret a etre importe dans votre logiciel comptable.",
      },
      {
        question: "Les releves de toutes les federations Credit Mutuel sont-ils compatibles ?",
        answer:
          "Oui, ReleveFacile gere les releves des differentes federations du Credit Mutuel : Credit Mutuel de Bretagne et du Sud-Ouest (Arkea), Credit Mutuel Alliance Federale (Centre Est Europe, Nord Europe, etc.), et Credit Mutuel Ocean. Les variations de format entre federations sont detectees automatiquement.",
      },
      {
        question: "Comment telecharger un releve PDF depuis le Credit Mutuel en ligne ?",
        answer:
          "Connectez-vous sur creditmutuel.fr (ou le site de votre federation, comme cmb.fr pour le Credit Mutuel de Bretagne). Allez dans Comptes > Releves en ligne > Releves de compte. Selectionnez le mois et cliquez sur le lien PDF pour telecharger votre releve.",
      },
      {
        question: "Quels types de releves Credit Mutuel sont pris en charge ?",
        answer:
          "ReleveFacile est compatible avec les releves de compte courant, les releves de compte professionnel, les releves de Livret Bleu, et les releves de compte sur Livret Credit Mutuel. Les releves mensuels et trimestriels sont tous geres.",
      },
      {
        question: "Quelle est la difference entre les releves Credit Mutuel et CIC ?",
        answer:
          "Le Credit Mutuel et le CIC font partie du meme groupe (Credit Mutuel Alliance Federale), mais leurs releves PDF utilisent des mises en page legerement differentes. ReleveFacile detecte automatiquement s'il s'agit d'un releve Credit Mutuel ou CIC et applique le bon extracteur pour chaque format.",
      },
    ],
  },
  fortuneo: {
    slug: "fortuneo",
    name: "Fortuneo",
    bic: "FTNOFRP1",
    logo: "/banks/fortuneo.svg",
    isSupported: true,
    seoTitle: "Convertir un releve Fortuneo en Excel & CSV",
    seoDescription:
      "Convertissez vos releves Fortuneo Banque PDF en Excel et CSV en quelques secondes. Extraction automatique des transactions, compatible compte courant, bourse et assurance-vie.",
    faq: [
      {
        question: "Comment convertir un releve Fortuneo en Excel ?",
        answer:
          "Deposez votre releve Fortuneo PDF sur ReleveFacile. Notre outil detecte automatiquement le format Fortuneo et extrait toutes vos operations bancaires pour generer un fichier Excel ou CSV, avec la date, le libelle et le montant de chaque transaction.",
      },
      {
        question: "Quels types de releves Fortuneo sont pris en charge ?",
        answer:
          "ReleveFacile est compatible avec les releves de compte courant Fortuneo (Gold, Fosfo), les releves de Livret+, et les releves de compte joint. Les releves de compte-titres et d'assurance-vie ne sont pas encore pris en charge car leur format differe des releves bancaires classiques.",
      },
      {
        question: "Comment telecharger un releve PDF depuis Fortuneo ?",
        answer:
          "Connectez-vous sur fortuneo.fr, puis allez dans Mes Comptes > Documents > Releves de compte. Selectionnez le mois souhaite et cliquez sur l'icone PDF pour telecharger. Vous pouvez egalement acceder a vos releves depuis l'application mobile Fortuneo.",
      },
      {
        question: "Fortuneo propose deja un export, pourquoi utiliser ReleveFacile ?",
        answer:
          "L'export natif de Fortuneo (QIF, OFX) est limite aux operations recentes et son format peut poser des problemes de compatibilite avec certains logiciels comptables francais. ReleveFacile genere un fichier au format francais (separateur point-virgule, dates JJ/MM/AAAA, virgule decimale) et propose un export Excel mis en forme, ideal pour la comptabilite.",
      },
      {
        question: "Les releves Fortuneo sont-ils faciles a convertir ?",
        answer:
          "Les releves PDF Fortuneo ont une mise en page epuree avec des colonnes clairement definies, ce qui facilite l'extraction. ReleveFacile gere neanmoins les specificites comme les operations carte regroupees en fin de mois, les libelles avec references SEPA et les virements instantanes.",
      },
    ],
  },
  "hello-bank": {
    slug: "hello-bank",
    name: "Hello bank!",
    bic: "BNPAFRPP",
    logo: "/banks/hello-bank.svg",
    isSupported: true,
    seoTitle: "Convertir un releve Hello bank! en Excel & CSV",
    seoDescription:
      "Convertissez vos releves Hello bank! (par BNP Paribas) PDF en Excel et CSV en quelques secondes. Extraction automatique des transactions, compatible avec tous les comptes Hello bank!.",
    faq: [
      {
        question: "Comment convertir un releve Hello bank! en Excel ?",
        answer:
          "Deposez votre releve Hello bank! PDF sur ReleveFacile. L'outil detecte automatiquement le format Hello bank! (base sur le format BNP Paribas) et extrait toutes vos transactions pour generer un fichier Excel ou CSV en quelques secondes.",
      },
      {
        question: "Quels formats de releves Hello bank! sont compatibles ?",
        answer:
          "ReleveFacile prend en charge les releves de compte courant Hello bank! (Hello One, Hello Prime, Hello Prime Duo), les releves de Livret Hello, et les releves de compte joint. Les releves mensuels telecharges depuis l'espace client ou l'application sont tous compatibles.",
      },
      {
        question: "Comment telecharger un releve PDF depuis Hello bank! ?",
        answer:
          "Connectez-vous sur hellobankpro.fr ou sur l'application Hello bank!. Rendez-vous dans la section Documents > Releves de compte. Selectionnez la periode et telechargez le PDF. Les releves sont egalement accessibles depuis l'espace BNP Paribas si vous avez lie vos comptes.",
      },
      {
        question: "Les releves Hello bank! et BNP Paribas sont-ils identiques ?",
        answer:
          "Hello bank! est une filiale de BNP Paribas et les releves partagent une structure similaire. Cependant, la mise en page et certains libelles different (mention Hello bank! au lieu de BNP Paribas, codes operations specifiques). ReleveFacile distingue les deux formats et applique le bon traitement pour chacun.",
      },
      {
        question: "Les releves Hello bank! posent-ils des difficultes de conversion ?",
        answer:
          "Les releves Hello bank! heritent du format structure de BNP Paribas, ce qui facilite l'extraction. ReleveFacile gere les specificites comme les operations Apple Pay et Google Pay avec leurs libelles particuliers, les virements instantanes, et les prelevements SEPA avec references longues.",
      },
    ],
  },
  cic: {
    slug: "cic",
    name: "CIC",
    bic: "CMCIFRPP",
    logo: "/banks/cic.svg",
    isSupported: true,
    seoTitle: "Convertir un releve CIC en Excel & CSV",
    seoDescription:
      "Convertissez vos releves CIC (Credit Industriel et Commercial) PDF en Excel et CSV en quelques secondes. Extraction automatique des operations, compatible comptes particuliers et professionnels.",
    faq: [
      {
        question: "Comment convertir un releve CIC en Excel ?",
        answer:
          "Deposez votre releve CIC au format PDF sur ReleveFacile. L'outil detecte automatiquement le format CIC et extrait chaque operation avec sa date, son libelle et son montant. Vous obtenez un fichier Excel ou CSV propre, pret pour votre comptabilite ou vos analyses financieres.",
      },
      {
        question: "Quels types de releves CIC sont pris en charge ?",
        answer:
          "ReleveFacile gere les releves de compte courant CIC (particuliers et professionnels), les releves de compte joint, les releves de compte epargne et les releves de Livret A CIC. Les releves mensuels et trimestriels sont tous compatibles.",
      },
      {
        question: "Comment telecharger un releve PDF depuis le CIC en ligne ?",
        answer:
          "Connectez-vous sur cic.fr, puis allez dans Comptes > Releves en ligne. Selectionnez le compte et la periode. Cliquez sur le releve pour le telecharger au format PDF. Vous pouvez aussi acceder a vos releves depuis l'application mobile CIC.",
      },
      {
        question: "Les releves CIC et Credit Mutuel sont-ils traites de la meme maniere ?",
        answer:
          "Le CIC et le Credit Mutuel appartiennent au meme groupe mais leurs releves PDF ont des formats distincts (en-tetes, disposition des colonnes, polices). ReleveFacile detecte automatiquement s'il s'agit d'un releve CIC ou Credit Mutuel et applique le parseur adapte pour une extraction optimale.",
      },
      {
        question: "Quelles specificites du format CIC ReleveFacile gere-t-il ?",
        answer:
          "Les releves CIC presentent des particularites comme les operations carte bancaire regroupees par date d'arret, les libelles avec references longues (numeros de cheques, references SEPA), et les totaux de page. ReleveFacile reconstruit chaque transaction individuellement et gere correctement la pagination des operations.",
      },
    ],
  },
  hsbc: {
    slug: "hsbc",
    name: "HSBC France",
    bic: "CCFRFRPP",
    logo: "/banks/hsbc.svg",
    isSupported: false,
    seoTitle: "Convertir un releve HSBC France en Excel & CSV",
    seoDescription:
      "Convertissez vos releves HSBC France (desormais My Money Group / CCF) PDF en Excel et CSV. Support en cours de developpement pour les anciens formats HSBC et le nouveau format CCF.",
    faq: [
      {
        question: "Comment convertir un releve HSBC France en Excel ?",
        answer:
          "Le support complet de HSBC France est en cours de developpement sur ReleveFacile. Vous pouvez deja deposer votre releve HSBC PDF pour tenter une extraction automatique via notre parseur generique. Les resultats peuvent varier selon le format de votre releve.",
      },
      {
        question: "Les releves de l'ancien HSBC France et du nouveau CCF sont-ils compatibles ?",
        answer:
          "HSBC France a ete rachetee par My Money Group et renommee CCF en 2024. Les formats de releves ont change lors de cette transition. ReleveFacile travaille sur la compatibilite avec les deux formats : les anciens releves HSBC France et les nouveaux releves CCF.",
      },
      {
        question: "Comment telecharger un releve PDF depuis HSBC France / CCF ?",
        answer:
          "Si vous etes un ancien client HSBC France, connectez-vous sur l'espace CCF (ccf.fr) qui a remplace l'espace client HSBC. Allez dans Documents > Releves pour telecharger vos releves au format PDF. Les releves anterieurs a la migration peuvent etre dans un format different.",
      },
      {
        question: "Pourquoi le support HSBC France n'est-il pas encore complet ?",
        answer:
          "Le format des releves HSBC France est plus complexe que celui des autres banques francaises : colonnes en anglais et en francais, formats de montant specifiques, et la transition vers CCF a introduit un nouveau format. Notre equipe travaille a finaliser un parseur dedie pour couvrir ces cas.",
      },
      {
        question: "Que faire en attendant le support complet de HSBC France ?",
        answer:
          "Vous pouvez essayer de convertir votre releve HSBC via ReleveFacile : notre parseur generique tente d'extraire les transactions de tout format PDF bancaire. Si le resultat n'est pas satisfaisant, vous serez notifie par email des que le parseur dedie HSBC France / CCF sera disponible.",
      },
    ],
  },
  n26: {
    slug: "n26",
    name: "N26",
    bic: "NTSBDEB1",
    logo: "/banks/n26.svg",
    isSupported: false,
    seoTitle: "Convertir un releve N26 en Excel & CSV",
    seoDescription:
      "Convertissez vos releves N26 PDF en Excel et CSV. Support en cours de developpement pour la neobanque allemande presente en France.",
    faq: [
      {
        question: "Comment convertir un releve N26 en Excel ?",
        answer: "Le support N26 est en cours de developpement. En attendant, vous pouvez tenter une conversion avec notre parseur generique en deposant votre releve PDF sur ReleveFacile.",
      },
      {
        question: "Comment telecharger un releve PDF depuis N26 ?",
        answer: "Ouvrez l'application N26, allez dans Mon Compte > Releves. Selectionnez le mois souhaite et telechargez le releve au format PDF.",
      },
      {
        question: "N26 propose deja un export CSV, pourquoi utiliser ReleveFacile ?",
        answer: "L'export CSV de N26 utilise le format international (separateur virgule, point decimal). ReleveFacile le convertit en format francais compatible avec Excel FR et les logiciels comptables francais.",
      },
    ],
  },
  revolut: {
    slug: "revolut",
    name: "Revolut",
    bic: "REVOGB21",
    logo: "/banks/revolut.svg",
    isSupported: false,
    seoTitle: "Convertir un releve Revolut en Excel & CSV",
    seoDescription:
      "Convertissez vos releves Revolut PDF en Excel et CSV au format francais. Support en cours de developpement pour la neobanque Revolut.",
    faq: [
      {
        question: "Comment convertir un releve Revolut en Excel ?",
        answer: "Le support Revolut est en cours de developpement. Vous pouvez tenter une conversion avec notre parseur generique en deposant votre releve PDF sur ReleveFacile.",
      },
      {
        question: "Comment telecharger un releve PDF depuis Revolut ?",
        answer: "Dans l'application Revolut, allez dans Profil > Documents > Releves. Selectionnez le mois et telechargez le PDF. Les releves sont aussi accessibles depuis app.revolut.com.",
      },
      {
        question: "Les releves Revolut en plusieurs devises sont-ils pris en charge ?",
        answer: "ReleveFacile se concentre sur les transactions en euros. Les releves multi-devises Revolut seront traites en extrayant uniquement les operations en EUR dans un premier temps.",
      },
    ],
  },
  qonto: {
    slug: "qonto",
    name: "Qonto",
    bic: "QNTOFRP1",
    logo: "/banks/qonto.svg",
    isSupported: false,
    seoTitle: "Convertir un releve Qonto en Excel & CSV",
    seoDescription:
      "Convertissez vos releves Qonto PDF en Excel et CSV. Ideal pour les TPE, startups et freelances utilisant le compte pro Qonto.",
    faq: [
      {
        question: "Comment convertir un releve Qonto en Excel ?",
        answer: "Le support Qonto est en cours de developpement. En attendant, tentez une conversion avec notre parseur generique. Qonto propose aussi un export CSV natif que vous pouvez utiliser.",
      },
      {
        question: "Pourquoi convertir un releve Qonto alors que Qonto a des integrations comptables ?",
        answer: "Qonto propose des integrations avec certains logiciels comptables, mais pas tous. ReleveFacile offre un format CSV universel compatible avec n'importe quel logiciel francais, et un export Excel mis en forme pour vos archives.",
      },
    ],
  },
  shine: {
    slug: "shine",
    name: "Shine",
    logo: "/banks/shine.svg",
    isSupported: false,
    seoTitle: "Convertir un releve Shine en Excel & CSV",
    seoDescription:
      "Convertissez vos releves Shine (Societe Generale) PDF en Excel et CSV. Pour les freelances et auto-entrepreneurs utilisant le compte pro Shine.",
    faq: [
      {
        question: "Comment convertir un releve Shine en Excel ?",
        answer: "Le support Shine est en cours de developpement. Shine, filiale de la Societe Generale, utilise un format specifique. Vous pouvez tenter une conversion avec notre parseur generique.",
      },
      {
        question: "Shine est-il different de la Societe Generale pour la conversion ?",
        answer: "Oui, les releves Shine ont un format different de ceux de la Societe Generale classique. Un parseur dedie est en cours de developpement pour gerer les specificites du format Shine.",
      },
    ],
  },
  monabanq: {
    slug: "monabanq",
    name: "Monabanq",
    bic: "CMCIFRPP",
    logo: "/banks/monabanq.svg",
    isSupported: false,
    seoTitle: "Convertir un releve Monabanq en Excel & CSV",
    seoDescription:
      "Convertissez vos releves Monabanq (filiale du Credit Mutuel) PDF en Excel et CSV. Support en cours de developpement.",
    faq: [
      {
        question: "Comment convertir un releve Monabanq en Excel ?",
        answer: "Le support Monabanq est en cours de developpement. Monabanq etant une filiale du Credit Mutuel, le format est similaire. Vous pouvez tenter une conversion avec notre parseur generique ou celui du Credit Mutuel.",
      },
    ],
  },
  nickel: {
    slug: "nickel",
    name: "Nickel",
    logo: "/banks/nickel.svg",
    isSupported: false,
    seoTitle: "Convertir un releve Nickel en Excel & CSV",
    seoDescription:
      "Convertissez vos releves Nickel (par BNP Paribas) PDF en Excel et CSV. Support en cours de developpement pour le compte sans banque.",
    faq: [
      {
        question: "Comment convertir un releve Nickel en Excel ?",
        answer: "Le support Nickel est en cours de developpement. Nickel etant une filiale de BNP Paribas, le format partage certaines similarites. Vous pouvez tenter une conversion avec notre parseur generique.",
      },
    ],
  },
};

export const BANK_SLUGS = Object.keys(BANKS);

export const SUPPORTED_BANKS = Object.values(BANKS).filter((b) => b.isSupported);
