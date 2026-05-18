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
import { getEntityData } from "@/lib/getEntityData";

interface Entreprise {
  nom: string;
  tagline: string;
  description: string;
  slug: string;
  image: string;
  typeEntite: 'business' | 'social' | 'cooperative';
}
import Link from "next/link";

// Arguments de confiance dynamisés par type d'entité
const getPartnershipReasons = (type: string, nom: string) => {
  const defaults = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Gouvernance Transparente",
      desc: "Reporting rigoureux et intégrité totale dans la gestion de nos projets et ressources."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Innovation Opérationnelle",
      desc: "Optimisation de nos processus pour maximiser l'efficacité de nos interventions."
    }
  ];

  if (type === 'social') {
    return [
      {
        icon: <Heart className="w-6 h-6" />,
        title: "Impact Social Mesurable",
        desc: `Des actions concrètes menées par ${nom} sur le terrain avec des indicateurs de performance humaine.`
      },
      ...defaults,
      {
        icon: <Globe className="w-6 h-6" />,
        title: "Ancrage Communautaire",
        desc: "Une confiance bâtie main dans la main avec les populations locales et les bénéficiaires."
      }
    ];
  }

  if (type === 'cooperative') {
    return [
      {
        icon: <Sprout className="w-6 h-6" />,
        title: "Valorisation du Terroir",
        desc: `Une mutualisation des forces pour garantir des produits authentiques et de haute qualité.`
      },
      ...defaults,
      {
        icon: <BarChart3 className="w-6 h-6" />,
        title: "Équité Économique",
        desc: "Un modèle de redistribution juste assurant une rémunération équitable de chaque membre."
      }
    ];
  }

  // Fallback / Business
  return [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Performance & Rentabilité",
      desc: `Une stratégie de croissance maîtrisée pour garantir la pérennité économique de ${nom}.`
    },
    ...defaults,
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Vision Marché",
      desc: "Une réactivité face aux opportunités et aux exigences de notre secteur d'activité."
    }
  ];
};

export default async function Partnerships({ params }: { params: Promise<{ subdomain: string }> }) {
  const { subdomain } = await params;
  const data: Entreprise | null = await getEntityData(subdomain);

  if (!data) {
    return <div className="py-24 text-center">Entité introuvable...</div>;
  }

  const partnershipReasons = getPartnershipReasons(data.typeEntite, data.nom);

  // Configuration sémantique par type d'entité
  const contextConfig = {
    social: {
      badge: "Soutiens & Alliances",
      title: "Soutenir notre cause,",
      highlight: "Démultiplier l'impact.",
      desc: `Rejoignez les partenaires institutionnels et privés qui font confiance à ${data.nom} pour porter des solutions solidaires et transformer durablement des vies.`,
      docTitle: "Ressources & \nRapports d'Activité",
      docDesc: "Consultez nos bilans d'impact social et nos rapports financiers pour analyser la transparence de nos actions."
    },
    cooperative: {
      badge: "Partenariats Commerciaux & RSE",
      title: "S'associer à la terre,",
      highlight: "Valoriser le collectif.",
      desc: `Développez des alliances durables avec ${data.nom}. Nous proposons aux distributeurs et acteurs engagés un accès direct à une production responsable et éthique.`,
      docTitle: "Espace \nProducteurs & Partenaires",
      docDesc: "Accédez aux cahiers des charges, chartes de qualité et documents de gouvernance de notre coopérative."
    },
    business: {
      badge: "Partenariats Stratégiques",
      title: "Investir dans une vision,",
      highlight: "Co-construire la croissance.",
      desc: data.description || `Découvrez les opportunités de collaboration et de synergie d'affaires avec ${data.nom} pour accélérer notre développement sur le marché.`,
      docTitle: "Espace Ressources \nInvestisseurs",
      docDesc: "Consultez nos présentations d'affaires et notre vision stratégique pour analyser notre trajectoire de croissance."
    }
  };

  const current = contextConfig[data.typeEntite] || contextConfig.business;

  // Documents de ressources adaptés dynamiquement au nom de l'entité
  const resourceDocs = [
    { name: `Présentation Institutionnelle ${data.nom}`, size: "2.4 MB", type: "PDF" },
    { name: data.typeEntite === 'social' ? "Rapport d'Impact Social" : "Vision Stratégique & Perspectives", size: "1.8 MB", type: "PDF" },
  ];

  return (
    <div className="bg-background">
      {/* 1. SECTION MESSAGE (L'ACCROCHE) */}
      <section className="py-24 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-2/3 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-[0.2em]">
                <Handshake size={14} /> {current.badge}
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground leading-tight">
                {current.title} <br />
                <span className="text-brand">{current.highlight}</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {current.desc}
              </p>
            </div>
            
            {/* Citation transformée pour être propre à l'entité */}
            <div className="lg:w-1/3 p-8 bg-muted/50 rounded-3xl border border-border">
              <p className="text-sm font-medium italic text-foreground leading-relaxed">
                &quot;Bâtir des relations de confiance à long terme est la clé de voûte de notre efficacité et de notre réussite sur le terrain.&quot;
              </p>
              <p className="mt-4 text-xs font-bold uppercase text-brand">— Direction {data.nom}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION POURQUOI NOUS REJOINDRE (LES ARGUMENTS) */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h3 className="text-3xl font-heading font-bold mb-4">Pourquoi s&apos;associer à {data.nom} ?</h3>
            <p className="text-muted-foreground">Les piliers fondamentaux qui font de notre structure un partenaire de choix.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnershipReasons.map((arg, i) => (
              <div key={i} className="group p-8 bg-background rounded-3xl border border-border hover:border-brand/50 transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-brand/10 text-brand mb-6 group-hover:scale-110 transition-transform">
                  {arg.icon}
                </div>
                <h4 className="font-bold text-lg mb-3 text-foreground">{arg.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{arg.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECTION DOCUMENTS (L'ACTION) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-brand rounded-[2.5rem] p-8 md:p-16 text-brand-foreground relative overflow-hidden shadow-2xl shadow-brand/20">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              <div>
                <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6 whitespace-pre-line">
                  {current.docTitle}
                </h3>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  {current.docDesc}
                </p>

                <Link href="/contact">
                  <button className="cursor-pointer inline-flex items-center gap-3 bg-white text-brand px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition-all">
                    Devenir Partenaire <ArrowRight size={18} />
                  </button>
                </Link>
              </div>

              <div className="space-y-3">
                {resourceDocs.map((doc, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-5 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-all group cursor-pointer"
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
                    <div className="p-2 rounded-lg bg-white/0 group-hover:bg-white/20 transition-all">
                      <Download size={20} className="text-white" />
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Décorations de fond */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>
    </div>
  );
}