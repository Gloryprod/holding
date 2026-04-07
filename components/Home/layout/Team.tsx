import { Mail} from "lucide-react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Obed Kodjo",
    role: "Président Directeur Général",
    description: "Visionnaire à l'origine de la synergie entre l'impact social et l'excellence commerciale.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=500&fit=crop", // Remplacer par la vraie photo
  },
  {
    name: "Nom du Responsable",
    role: "Directeur des Opérations (COO)",
    description: "Coordination transversale entre l'ONG et les filiales privées du groupe.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=500&fit=crop",
  },
  {
    name: "Nom du Responsable",
    role: "Directeur Administratif & Financier",
    description: "Garant de la transparence financière et de la pérennité économique de la holding.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=500&fit=crop",
  },
  {
    name: "Nom du Responsable",
    role: "Directeur des Opérations (COO)",
    description: "Coordination transversale entre l'ONG et les filiales privées du groupe.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=500&fit=crop",
  },
  {
    name: "Nom du Responsable",
    role: "Directeur Administratif & Financier",
    description: "Garant de la transparence financière et de la pérennité économique de la holding.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=500&fit=crop",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-brand uppercase tracking-[0.2em] mb-4">
            Gouvernance
          </h2>
          <h3 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground mb-6">
            L&apos;Équipe Transversale
          </h3>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Une expertise pluridisciplinaire unie pour piloter la croissance de nos entités et maximiser notre impact global.
          </p>
        </div>

        {/* Grille des membres */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {teamMembers.map((member, index) => (
            <div key={index} className="group flex flex-col">
              {/* Photo avec effet au survol */}
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl mb-6 bg-muted">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                /> */}

                {/* Overlay social au survol */}
                <div className="absolute inset-0 bg-brand/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a href="#" className="p-3 bg-white rounded-full text-brand hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </a>
                  <a href="#" className="p-3 bg-white rounded-full text-brand hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </a>
                </div>
              </div>

              {/* Infos */}
              <div className="flex items-center flex-col text-center">
                 <h4 className="text-xl font-heading font-bold text-foreground">
                    {member.name}
                </h4>
                <p className="text-brand font-bold text-sm mb-3">
                    {member.role}
                </p>
                {/* <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.description}
                </p> */}
              </div>
             
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}