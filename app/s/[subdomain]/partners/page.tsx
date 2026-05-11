import { 
  BarChart3, 
  ShieldCheck, 
  Globe, 
  Zap, 
  FileText, 
  Download, 
  ArrowRight,
  Handshake
} from "lucide-react";
import Header from "@/components/Home/layout/Header";
import Footer from "@/components/Home/layout/Footer";

interface Entreprise {
  nom: string;
  tagline: string;
  description: string;
  iconName: string;
  slug: string;
  image: string; // On suppose que l'image est gérée à part ou via un champ supplémentaire
}


const partnershipReasons = [
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Modèle Hybride Résilient",
    desc: "Une diversification stratégique entre secteurs marchand et non-marchand pour une stabilité accrue."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Gouvernance Transparente",
    desc: "Reporting rigoureux et audits réguliers garantissant l'intégrité de chaque flux financier."
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Impact Territorial Réel",
    desc: "Des actions concrètes sur le terrain avec des indicateurs de performance sociale mesurables."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Innovation Opérationnelle",
    desc: "Synergie technologique et optimisation des processus au sein de toutes nos filiales."
  }
];

const resourceDocs = [
  { name: "Présentation Corporate 2026", size: "2.4 MB", type: "PDF" },
  { name: "Rapport d'Impact & RSE", size: "1.8 MB", type: "PDF" },
  { name: "Vision Stratégique & Business Plan", size: "4.2 MB", type: "PDF" },
];

export default function Partnerships({ data }: { data: Entreprise }) {
  return (
    <>
    <div className="bg-background">
      {/* 1. SECTION MESSAGE (L'ACCROCHE) */}
      <section className="py-24 border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-2/3 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-[0.2em]">
                <Handshake size={14} /> Partenariats Stratégiques
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground leading-tight">
                Investir dans une vision, <br />
                <span className="text-brand">Co-construire l&apos;avenir.</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Obed Group propose aux institutions et investisseurs privés un modèle unique où la performance des SARL sécurise et démultiplie l&apos;impact de nos actions sociales.
              </p>
            </div>
            <div className="lg:w-1/3 p-8 bg-muted/50 rounded-3xl border border-border">
              <p className="text-sm font-medium italic text-foreground leading-relaxed">
                &quot;Notre objectif est de prouver qu&apos;une holding peut être à la fois un moteur économique puissant et un pilier de développement communautaire.&quot;
              </p>
              <p className="mt-4 text-xs font-bold uppercase text-brand">— Direction Générale</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION POURQUOI NOUS REJOINDRE (LES ARGUMENTS) */}
      <section className="py-12 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h3 className="text-3xl font-heading font-bold mb-4">Pourquoi s&apos;associer à Obed Group ?</h3>
            <p className="text-muted-foreground">Quatre piliers qui font de notre holding un partenaire de confiance.</p>
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
                <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6 italic">
                  Espace Ressources <br />Investisseurs
                </h3>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  Consultez nos documents stratégiques pour analyser notre trajectoire de croissance et nos rapports d&apos;activité consolidés.
                </p>
                <button className="inline-flex items-center gap-3 bg-white text-brand px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition-all">
                  Ouvrir un compte partenaire <ArrowRight size={18} />
                </button>
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
    </>
  );
}