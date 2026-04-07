import { Heart, Sprout, Building2, Briefcase, ArrowUpRight } from "lucide-react";

const entities = [
  {
    title: "L'ONG",
    description: "Action sociale et humanitaire pour le développement des communautés locales.",
    icon: <Heart className="w-6 h-6" />,
    link: "/ong",
    color: "bg-brand/10",
  },
  {
    title: "La Coopérative",
    description: "Mutualisation des ressources et soutien aux producteurs pour une économie solidaire.",
    icon: <Sprout className="w-6 h-6" />,
    link: "/cooperative",
    color: "bg-brand/10",
  },
  {
    title: "SARL 1",
    description: "Expertise technique et solutions innovantes pour les défis industriels de demain.",
    icon: <Building2 className="w-6 h-6" />,
    link: "/sarl1",
    color: "bg-background border border-border",
  },
  {
    title: "SARL 2",
    description: "Services commerciaux et logistiques haute performance à l'échelle internationale.",
    icon: <Briefcase className="w-6 h-6" />,
    link: "/sarl2",
    color: "bg-background border border-border",
  },
];

export default function Entities() {
  return (
    <section id="features" className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* En-tête de section */}
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-3">
            Notre Écosystème
          </h2>
          <p className="text-3xl md:text-4xl font-heading font-bold text-foreground max-w-2xl">
            Quatre entités, une seule vision : la synergie au service de l&apos;impact.
          </p>
        </div>

        {/* Grille des entités */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {entities.map((entity, index) => (
            <div 
              key={index}
              className={`group relative p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 ${entity.color}`}
            >
              {/* Icône / Logo temporaire */}
              <div className="mb-6 w-12 h-12 rounded-2xl bg-brand text-brand-foreground flex items-center justify-center shadow-lg shadow-brand/20">
                {entity.icon}
              </div>

              {/* Contenu */}
              <h3 className="text-xl font-heading font-bold mb-3 text-foreground">
                {entity.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                {entity.description}
              </p>

              {/* Bouton d'action */}
              <a 
                href={entity.link}
                className="inline-flex items-center gap-2 text-sm font-bold text-brand group-hover:underline"
              >
                Visiter l&apos;espace
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}