import Image from "next/image";
import * as Icons from "lucide-react";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

// const milestones = [
//   { year: "2018", title: "Genèse de l'ONG", desc: "Création de l'entité sociale pour répondre aux besoins urgents des communautés." },
//   { year: "2020", title: "Lancement de la Coopérative", desc: "Structuration des producteurs locaux pour une autonomisation durable." },
//   { year: "2022", title: "Expansion SARL", desc: "Ouverture des filiales commerciales pour financer et pérenniser l'impact global." },
//   { year: "2026", title: "Consolidation Holding", desc: "Unification sous l'identité Obed Group pour une synergie maximale." },
// ];

interface Entreprise {
  nom: string;
  tagline: string;
  description: string;
  iconName: string;
  slug: { current: string };
  image: string; // On suppose que l'image est gérée à part ou via un champ supplémentaire
  mission: string;
  adresse: string;
  telephone: string;
  email: string;
  services: {
    titre: string;
    description: string;
  }[]
  projets: {
    titre: string;
    description: string; // PortableText
    statut: string;
    imagePrincipale: string;
  }[]

}

export function Journey({ data }: { data: Entreprise }) {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col text-center md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h3 className="text-4xl md:text-4xl font-heading font-bold">Projets Majeurs</h3>
          </div>
          <div className="text-muted-foreground font-medium">
            {data.projets?.length || 0} Réalisations répertoriées
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projets && data.projets.length > 0 ? (
            data.projets.map((projet: any) => (
              <div key={projet.slug} className="group bg-background rounded-[2rem] overflow-hidden border border-border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/10">
                
                {/* Image Hover Effect */}
                <div className="relative h-72 overflow-hidden">
                  {projet.imagePrincipale ? (
                    <Image 
                      src={urlFor(projet.imagePrincipale).url()} 
                      alt={projet.titre} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-muted text-muted-foreground italic">Pas d&apos;image</div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  
                  {/* Badge Statut */}
                  <div className="absolute top-6 left-6">
                      <span className="bg-brand text-brand-foreground px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {projet.statut?.replace('-', ' ')}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-2xl font-heading font-bold mb-4 group-hover:text-brand transition-colors">
                    {projet.titre}
                  </h4>
                  <div className="text-muted-foreground text-sm mb-6 min-h-15">
                    <PortableText value={projet.description} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-[2rem]">
              <Icons.Ghost size={48} className="mx-auto text-muted-foreground mb-4 opacity-20" />
              <p className="text-muted-foreground italic">Aucune réalisation affichée pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}