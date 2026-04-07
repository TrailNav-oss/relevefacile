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
      "Convertissez vos releves Credit Agricole PDF en Excel et CSV. Compatible avec toutes les caisses regionales.",
    faq: [
      {
        question: "Les releves de toutes les caisses regionales sont-ils compatibles ?",
        answer:
          "Oui, ReleveFacile est compatible avec les releves de toutes les 39 caisses regionales du Credit Agricole.",
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
      "Convertissez vos releves Societe Generale PDF en fichiers Excel et CSV. Extraction rapide et precise de vos transactions.",
    faq: [],
  },
  lcl: {
    slug: "lcl",
    name: "LCL",
    bic: "CRLYFRPP",
    logo: "/banks/lcl.svg",
    isSupported: true,
    seoTitle: "Convertir un releve LCL en Excel & CSV",
    seoDescription:
      "Convertissez vos releves LCL PDF en Excel et CSV. Gestion intelligente des libelles multi-lignes.",
    faq: [],
  },
  "la-banque-postale": {
    slug: "la-banque-postale",
    name: "La Banque Postale",
    bic: "PSSTFRPP",
    logo: "/banks/la-banque-postale.svg",
    isSupported: true,
    seoTitle: "Convertir un releve La Banque Postale en Excel & CSV",
    seoDescription: "Convertissez vos releves La Banque Postale PDF en Excel et CSV.",
    faq: [],
  },
  boursorama: {
    slug: "boursorama",
    name: "Boursorama Banque",
    bic: "BOUSFRPP",
    logo: "/banks/boursorama.svg",
    isSupported: true,
    seoTitle: "Convertir un releve Boursorama en Excel & CSV",
    seoDescription: "Convertissez vos releves Boursorama Banque PDF en Excel et CSV.",
    faq: [],
  },
  "banque-populaire": {
    slug: "banque-populaire",
    name: "Banque Populaire",
    bic: "CCBPFRPP",
    logo: "/banks/banque-populaire.svg",
    isSupported: true,
    seoTitle: "Convertir un releve Banque Populaire en Excel & CSV",
    seoDescription: "Convertissez vos releves Banque Populaire PDF en Excel et CSV.",
    faq: [],
  },
  "caisse-epargne": {
    slug: "caisse-epargne",
    name: "Caisse d'Epargne",
    bic: "CEPAFRPP",
    logo: "/banks/caisse-epargne.svg",
    isSupported: true,
    seoTitle: "Convertir un releve Caisse d'Epargne en Excel & CSV",
    seoDescription: "Convertissez vos releves Caisse d'Epargne PDF en Excel et CSV.",
    faq: [],
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
