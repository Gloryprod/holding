'use client';

import { 
  BarChart3, 
  ShieldCheck, 
  Globe, 
  Zap, 
  FileText, 
  Download, 
  ArrowRight,
  Handshake,
  Heart,
  Sprout,
} from "lucide-react";
import { getLocale } from "@/lib/getLocal";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

type LocalizedString = string | { fr?: string; en?: string };

interface Entreprise {
  nom: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  slug: string;
  image: string;
  typeEntite: 'business' | 'social' | 'cooperative';
}

// Variants Framer Motion pour les séquences d'animation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const getPartnershipReasons = (type: string, nom: string, lang: string) => {
  const isFr = lang === 'fr';

  const defaults = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: isFr ? "Gouvernance Transparente" : "Transparent Governance",
      desc: isFr 
        ? "Reporting rigoureux et intégrité totale dans la gestion de nos projets et ressources."
        : "Rigorous reporting and total integrity in managing our projects and resources."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: isFr ? "Innovation Opérationnelle" : "Operational Innovation",
      desc: isFr 
        ? "Optimisation de nos processus pour maximiser l'efficacité de nos interventions."
        : "Optimization of our processes to maximize the efficiency of our interventions."
    }
  ];

  if (type === 'social') {
    return [
      {
        icon: <Heart className="w-6 h-6" />,
        title: isFr ? "Impact Social Mesurable" : "Measurable Social Impact",
        desc: isFr 
          ? `Des actions concrètes menées par ${nom} sur le terrain avec des indicateurs de performance humaine.`
          : `Concrete actions led by ${nom} in the field with key human impact indicators.`
      },
      ...defaults,
      {
        icon: <Globe className="w-6 h-6" />,
        title: isFr ? "Ancrage Communautaire" : "Community Rootedness",
        desc: isFr 
          ? "Une confiance bâtie main dans la main avec les populations locales et les bénéficiaires."
          : "Trust built hand-in-hand with local populations and beneficiaries."
      }
    ];
  }

  if (type === 'cooperative') {
    return [
      {
        icon: <Sprout className="w-6 h-6" />,
        title: isFr ? "Valorisation du Terroir" : "Promoting Local Terroir",
        desc: isFr 
          ? "Une mutualisation des forces pour garantir des produits authentiques et de haute qualité."
          : "Pooling strengths to guarantee authentic, high-quality products."
      },
      ...defaults,
      {
        icon: <BarChart3 className="w-6 h-6" />,
        title: isFr ? "Équité Économique" : "Economic Fairness",
        desc: isFr 
          ? "Un modèle de redistribution juste assurant une rémunération équitable de chaque membre."
          : "A fair redistribution model ensuring equitable remuneration for every member."
      }
    ];
  }

  // Fallback / Business
  return [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: isFr ? "Performance & Rentabilité" : "Performance & Profitability",
      desc: isFr 
        ? `Une stratégie de croissance maîtrisée pour garantir la pérennité économique de ${nom}.`
        : `A controlled growth strategy to guarantee the economic sustainability of ${nom}.`
    },
    ...defaults,
    {
      icon: <Globe className="w-6 h-6" />,
      title: isFr ? "Vision Marché" : "Market Vision",
      desc: isFr 
        ? "Une réactivité face aux opportunités et aux exigences de notre secteur d'activité."
        : "Responsiveness to market opportunities and the demands of our industry."
    }
  ];
};

export default function PartnershipsView({ data }: { data: Entreprise | null }) {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  if (!data) {
    return (
      <div className="py-24 text-center">
        {isFr ? "Entité introuvable..." : "Entity not found..."}
      </div>
    );
  }

  const nom = getLocale(data.nom, language) || "Notre Structure";
  const description = getLocale(data.description, language);
  const partnershipReasons = getPartnershipReasons(data.typeEntite, nom, language);

  const contextConfig = {
    social: {
      badge: isFr ? "Soutiens & Alliances" : "Support & Partnerships",
      title: isFr ? "Soutenir notre cause," : "Support our cause,",
      highlight: isFr ? "Démultiplier l'impact." : "Multiply the impact.",
      desc: isFr 
        ? `Rejoignez les partenaires institutionnels et privés qui font confiance à ${nom} pour porter des solutions solidaires et transformer durablement des vies.`
        : `Join institutional and private partners who trust ${nom} to carry out solidarity solutions and sustainably transform lives.`,
      docTitle: isFr ? "Ressources &\nRapports d'Activité" : "Resources &\nActivity Reports",
      docDesc: isFr 
        ? "Consultez nos bilans d'impact social et nos rapports financiers pour analyser la transparence de nos actions."
        : "Review our social impact assessments and financial reports to analyze the transparency of our actions."
    },
    cooperative: {
      badge: isFr ? "Partenariats Commerciaux & RSE" : "Commercial & CSR Partnerships",
      title: isFr ? "S'associer à la terre," : "Partnering with the land,",
      highlight: isFr ? "Valoriser le collectif." : "Empowering the collective.",
      desc: isFr 
        ? `Développez des alliances durables avec ${nom}. Nous proposons aux distributeurs et acteurs engagés un accès direct à une production responsable et éthique.`
        : `Build sustainable alliances with ${nom}. We offer distributors and committed stakeholders direct access to responsible and ethical production.`,
      docTitle: isFr ? "Espace\nProducteurs & Partenaires" : "Producers &\nPartners Portal",
      docDesc: isFr 
        ? "Accédez aux cahiers des charges, chartes de qualité et documents de gouvernance de notre coopérative."
        : "Access specifications, quality charters, and governance documents for our cooperative."
    },
    business: {
      badge: isFr ? "Partenariats Stratégiques" : "Strategic Partnerships",
      title: isFr ? "Investir dans une vision," : "Invest in a vision,",
      highlight: isFr ? "Co-construire la croissance." : "Co-create growth.",
      desc: description || (isFr 
        ? `Découvrez les opportunités de collaboration et de synergie d'affaires avec ${nom} pour accélérer notre développement sur le marché.`
        : `Discover opportunities for collaboration and business synergies with ${nom} to accelerate our market development.`),
      docTitle: isFr ? "Espace Ressources\nInvestisseurs" : "Investor Resource\nCenter",
      docDesc: isFr 
        ? "Consultez nos présentations d'affaires et notre vision stratégique pour analyser notre trajectoire de croissance."
        : "View our business presentations and strategic vision to analyze our growth trajectory."
    }
  };

  const current = contextConfig[data.typeEntite] || contextConfig.business;

  const resourceDocs = [
    { 
      name: isFr ? `Présentation Institutionnelle ${nom}` : `Institutional Presentation ${nom}`, 
      size: "2.4 MB", 
      type: "PDF" 
    },
    { 
      name: data.typeEntite === 'social' 
        ? (isFr ? "Rapport d'Impact Social" : "Social Impact Report")
        : (isFr ? "Vision Stratégique & Perspectives" : "Strategic Vision & Outlook"), 
      size: "1.8 MB", 
      type: "PDF" 
    },
  ];

  return (
    <div className="bg-background overflow-hidden">
      {/* 1. ACCROCHE */}
      <section className="py-24 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col lg:flex-row gap-12 items-center"
          >
            <div className="lg:w-2/3 space-y-6">
              <motion.div 
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-[0.2em]"
              >
                <Handshake size={14} /> {current.badge}
              </motion.div>
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-heading font-black text-foreground leading-tight">
                {current.title} <br />
                <span className="text-brand">{current.highlight}</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {current.desc}
              </motion.p>
            </div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="lg:w-1/3 p-8 bg-muted/50 rounded-3xl border border-border shadow-sm"
            >
              <p className="text-sm font-medium italic text-foreground leading-relaxed">
                {isFr 
                  ? '" Bâtir des relations de confiance à long terme est la clé de voûte de notre efficacité et de notre réussite sur le terrain. "'
                  : '" Building long-term relationships of trust is the cornerstone of our effectiveness and success in the field." '}
              </p>
              <p className="mt-4 text-xs font-bold uppercase text-brand">
                — {isFr ? "Direction" : "Leadership"} {nom}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. ARGUMENTS */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h3 className="text-3xl font-heading font-bold mb-4">
              {isFr ? `Pourquoi s'associer à ${nom} ?` : `Why partner with ${nom}?`}
            </h3>
            <p className="text-muted-foreground">
              {isFr 
                ? "Les piliers fondamentaux qui font de notre structure un partenaire de choix."
                : "The fundamental pillars that make our organization a partner of choice."}
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {partnershipReasons.map((arg, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                whileHover={{ y: -6, borderColor: "rgba(var(--brand-rgb), 0.4)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group p-8 bg-background rounded-3xl border border-border transition-colors duration-300 shadow-sm"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-brand/10 text-brand mb-6 group-hover:scale-110 transition-transform">
                  {arg.icon}
                </div>
                <h4 className="font-bold text-lg mb-3 text-foreground">{arg.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{arg.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. DOCUMENTS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-brand rounded-[2.5rem] p-8 md:p-16 text-brand-foreground relative overflow-hidden shadow-2xl shadow-brand/20"
          >
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6 whitespace-pre-line">
                  {current.docTitle}
                </h3>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  {current.docDesc}
                </p>

                <Link href="/contact">
                  <motion.button 
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="cursor-pointer inline-flex items-center gap-3 bg-white text-brand px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    {isFr ? "Devenir Partenaire" : "Become a Partner"} <ArrowRight size={18} />
                  </motion.button>
                </Link>
              </div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-3"
              >
                {resourceDocs.map((doc, i) => (
                  <motion.div 
                    key={i} 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.18)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex items-center justify-between p-5 bg-white/10 rounded-2xl border border-white/10 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 rounded-xl">
                        <FileText className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{doc.name}</p>
                        <p className="text-xs text-white/60">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="p-2 rounded-lg bg-white/0 group-hover:bg-white/20 transition-all"
                    >
                      <Download size={20} className="text-white" />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}