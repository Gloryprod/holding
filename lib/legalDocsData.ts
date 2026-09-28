export interface CompanyConfig {
  slug: string;
  name: string;
  legalStatus: string;
  address: string;
  rccm: string;
  ifu: string;
  email: string;
  phone: string;
  publicationDirector: string;
  hostName: string;
  hostAddress: string;
}

// Configuration par entreprise / sous-site
export const COMPANIES: Record<string, CompanyConfig> = {
  kodanu: {
    slug: "kodanu",
    name: "KODANU",
    legalStatus: "Société à Responsabilité Limitée (SARL)",
    address: "Abomey-Calavi, Bénin",
    rccm: "[À COMPLÉTER dès délivrance]",
    ifu: "[À COMPLÉTER]",
    email: "kodanu.sarl@gmail.com",
    phone: "+229 01 61 02 49 32",
    publicationDirector: "Obed KODJO",
    hostName: "Vercel Inc",
    hostAddress: "San Francisco, États-Unis",
  },
  "ong-eden-benin": {
    slug: "ong-eden-benin",
    name: "EDEN BENIN",
    legalStatus: "Organisation Non Gouvernementale",
    address: "Abomey-Calavi, Bénin",
    rccm: "[À COMPLÉTER dès délivrance]",
    ifu: "[À COMPLÉTER]",
    email: "edenbenin.org@gmail.com",
    phone: "+229 01 61 02 49 32",
    publicationDirector: "Obed KODJO",
    hostName: "Vercel Inc",
    hostAddress: "San Francisco, États-Unis",
  },
  "agritropic": {
    slug: "agritropic",
    name: "AGRITROPIC",
    legalStatus: "Coopérative",
    address: "Quartier La Paix, Ouèdo, Abomey-Calavi, Bénin",
    rccm: "[À COMPLÉTER dès délivrance]",
    ifu: "[À COMPLÉTER]",
    email: "agritropicscoops@gmail.com",
    phone: "+229 01 61 02 49 32",
    publicationDirector: "Obed KODJO",
    hostName: "Vercel Inc",
    hostAddress: "San Francisco, États-Unis",
  },
  "bbs-wbb": {
    slug: "bbs-wbb",
    name: "Benin Bien Etre Services Well Being Business",
    legalStatus: "Société à Responsabilité Limitée (SARL)",
    address: "BP 963 Abomey Calavi, Ouèdo, Kpossidja",
    rccm: "[À COMPLÉTER dès délivrance]",
    ifu: "[À COMPLÉTER]",
    email: "dgcades2025@gmail.com",
    phone: "+229 01 61 02 49 32",
    publicationDirector: "Obed KODJO",
    hostName: "Vercel Inc",
    hostAddress: "San Francisco, États-Unis",
  },
};

export type LegalDocType =
  | "mentions-legales"
  | "politique-confidentialite"
  | "politique-cookies"
  | "cgu"
  | "propriete-intellectuelle"
  | "contact";

export const LEGAL_DOCS_CONTENT = {
  "mentions-legales": {
    title: {
      fr: "Mentions Légales",
      en: "Legal Notice",
    },
    getContent: (company: CompanyConfig) => ({
      fr: [
        {
          heading: "Éditeur du site",
          content: `Le présent site est édité par la société **${company.name}**, ${company.legalStatus} auprès du Registre du Commerce et du Crédit Mobilier (RCCM).\n\n- **Siège social :** ${company.address}\n- **Numéro RCCM :** ${company.rccm}\n- **Identifiant fiscal (IFU) :** ${company.ifu}\n- **Email de contact :** ${company.email}\n- **Téléphone :** ${company.phone}\n- **Directeur de la publication :** ${company.publicationDirector}`,
        },
        {
          heading: "Hébergement",
          content: `**Hébergeur :** ${company.hostName}\n**Adresse de l'hébergeur :** ${company.hostAddress}`,
        },
        {
          heading: "Note sur le statut de la société",
          content: `${company.name} est en cours d'immatriculation. Le présent site est publié à titre d'information dans l'attente de la finalisation de cette procédure. Les présentes mentions légales seront mises à jour dès la délivrance du numéro RCCM définitif.`,
        },
      ],
      en: [
        {
          heading: "Site Publisher",
          content: `This website is published by **${company.name}**, ${company.legalStatus} before the Trade and Personal Property Credit Register (RCCM).\n\n- **Headquarters:** ${company.address}\n- **RCCM Number:** ${company.rccm}\n- **Tax Identification (IFU):** ${company.ifu}\n- **Contact Email:** ${company.email}\n- **Phone:** ${company.phone}\n- **Publication Director:** ${company.publicationDirector}`,
        },
        {
          heading: "Hosting",
          content: `**Host:** ${company.hostName}\n**Host Address:** ${company.hostAddress}`,
        },
        {
          heading: "Company Status Note",
          content: `${company.name} is currently undergoing registration. This website is published for informational purposes pending the completion of this procedure. These legal notices will be updated upon issuance of the final RCCM number.`,
        },
      ],
    }),
  },
  "politique-confidentialite": {
    title: {
      fr: "Politique de Confidentialité",
      en: "Privacy Policy",
    },
    getContent: (company: CompanyConfig) => ({
      fr: [
        {
          heading: "1. Responsable de traitement",
          content: `**${company.name}** (${company.legalStatus}), joignable à [${company.email}](mailto:${company.email}), est responsable des traitements de données personnelles décrits ci-dessous.`,
        },
        {
          heading: "2. Données collectées",
          content: "Les données collectées (formulaire de contact, etc.) sont traitées dans le respect des finalités prévues et conservées selon les règles de sécurité en vigueur.",
        },
        {
          heading: "3. Base juridique",
          content: "Les traitements mis en œuvre reposent sur votre consentement, l'exécution d'un contrat ou le respect d'une obligation légale.",
        },
        {
          heading: "4. Droits des personnes concernées",
          content: `Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de limitation de vos données. Ces droits peuvent être exercés en écrivant à : [${company.email}](mailto:${company.email}).`,
        },
        {
          heading: "5. Sécurité",
          content: `${company.name} met en œuvre des mesures techniques et organisationnelles raisonnables pour protéger les données personnelles contre tout accès non autorisé, perte ou divulgation.`,
        },
      ],
      en: [
        {
          heading: "1. Data Controller",
          content: `**${company.name}** (${company.legalStatus}), reachable at [${company.email}](mailto:${company.email}), is responsible for the processing of personal data described below.`,
        },
        {
          heading: "2. Collected Data",
          content: "Collected data (contact forms, etc.) are processed in accordance with specified purposes and stored under applicable security standards.",
        },
        {
          heading: "3. Legal Basis",
          content: "The processing implemented relies on your consent, contract execution, or compliance with a legal obligation.",
        },
        {
          heading: "4. Data Subject Rights",
          content: `You have the right to access, rectify, erase, object to, and restrict processing of your data. You can exercise these rights by emailing: [${company.email}](mailto:${company.email}).`,
        },
        {
          heading: "5. Security",
          content: `${company.name} implements reasonable technical and organizational measures to protect personal data against unauthorized access, loss, or disclosure.`,
        },
      ],
    }),
  },
  "politique-cookies": {
    title: {
      fr: "Politique Cookies",
      en: "Cookie Policy",
    },
    getContent: (company: CompanyConfig) => ({
      fr: [
        {
          heading: "Gestion des Cookies",
          content: `Aucun cookie non strictement nécessaire au fonctionnement du site **${company.name}** n'est déposé sans votre consentement préalable.`,
        },
      ],
      en: [
        {
          heading: "Cookie Management",
          content: `No cookies that are not strictly necessary for the operation of the **${company.name}** website are placed without your prior consent.`,
        },
      ],
    }),
  },
  cgu: {
    title: {
      fr: "Conditions Générales d'Utilisation",
      en: "Terms of Service",
    },
    getContent: (company: CompanyConfig) => ({
      fr: [
        {
          heading: "1. Objet & Acceptation",
          content: `Les présentes conditions régissent l'accès et l'utilisation du site **${company.name}**. L'utilisation du site implique l'acceptation pleine et entière des présentes conditions.`,
        },
        {
          heading: "2. Obligations de l'utilisateur",
          content: "L'utilisateur s'engage à utiliser le site conformément à sa destination et à la loi applicable, et à ne pas porter atteinte à la sécurité du site.",
        },
        {
          heading: "3. Responsabilité",
          content: `Dans les limites permises par la loi, **${company.name}** ne saurait être tenu responsable des dommages indirects résultant de l'utilisation du site.`,
        },
      ],
      en: [
        {
          heading: "1. Purpose & Acceptance",
          content: `These terms govern the access and use of the **${company.name}** website. Using the site implies full acceptance of these terms.`,
        },
        {
          heading: "2. User Obligations",
          content: "The user agrees to use the site in accordance with its intended purpose and applicable law, without compromising site security.",
        },
        {
          heading: "3. Liability",
          content: `To the extent permitted by law, **${company.name}** shall not be liable for indirect damages resulting from site usage.`,
        },
      ],
    }),
  },
  "propriete-intellectuelle": {
    title: {
      fr: "Propriété Intellectuelle",
      en: "Intellectual Property",
    },
    getContent: (company: CompanyConfig) => ({
      fr: [
        {
          heading: "Droits d'auteur et Marques",
          content: `L'ensemble des éléments du site (nom, marque, logo, textes, visuels, code) est la propriété de **${company.name}** ou de ses partenaires. Toute reproduction, modification ou exploitation non autorisée est strictement interdite.`,
        },
      ],
      en: [
        {
          heading: "Copyright and Trademarks",
          content: `All elements of the site (name, brand, logo, text, visuals, code) are the property of **${company.name}** or its partners. Any unauthorized reproduction, modification, or exploitation is strictly prohibited.`,
        },
      ],
    }),
  },
  contact: {
    title: {
      fr: "Contact & Réclamations",
      en: "Contact & Claims",
    },
    getContent: (company: CompanyConfig) => ({
      fr: [
        {
          heading: "Nous contacter",
          content: `Pour toute question, demande ou réclamation relative au site ou aux services **${company.name}**, vous pouvez nous contacter :\n\n- **Email :** [${company.email}](mailto:${company.email})\n\n${company.name} s'engage à traiter les demandes reçues dans un délai raisonnable.`,
        },
      ],
      en: [
        {
          heading: "Contact Us",
          content: `For any question, request, or claim regarding the **${company.name}** website or services, you can reach us at:\n\n- **Email:** [${company.email}](mailto:${company.email})\n\n${company.name} commits to processing requests within a reasonable timeframe.`,
        },
      ],
    }),
  },
};