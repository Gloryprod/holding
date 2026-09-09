'use client';

import Image from "next/image";
import * as Icons from "lucide-react";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { useLanguage } from "@/context/LanguageContext";
import { getLocale } from "@/lib/getLocal";

type LocalizedString = string | { fr?: string; en?: string };

interface Projet {
  slug: { current: string };
  titre: LocalizedString;
  description: LocalizedString;
  statut: string;
  imagePrincipale: string;
}

interface Entreprise {
  nom: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  iconName: string;
  slug: { current: string };
  image: string;
  mission: LocalizedString;
  adresse: string;
  telephone: string;
  email: string;
  services: {
    titre: LocalizedString;
    description: LocalizedString;
  }[];
  projets: Projet[];
}

export function Journey({ data }: { data: Entreprise }) {
  const { language } = useLanguage();

  // Dictionnaire de traduction pour le statut d'avancement
  const formatStatut = (statutRaw: string) => {
    if (!statutRaw) return '';

    const labels: Record<string, { fr: string; en: string }> = {
      'en-cours': { fr: 'En cours', en: 'In Progress' },
      'termine': { fr: 'Terminé', en: 'Completed' },
      'levee-de-fonds': { fr: 'En levée de fonds', en: 'Fundraising' },
    };

    const key = statutRaw.toLowerCase();
    if (labels[key]) {
      return labels[key][language as 'fr' | 'en'] || labels[key].fr;
    }

    return statutRaw.replace(/-/g, ' ');
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col text-center md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h3 className="text-4xl md:text-4xl font-heading font-bold">
              {language === 'fr' ? 'Projets Majeurs' : 'Major Projects'}
            </h3>
          </div>
          <div className="text-muted-foreground font-medium">
            {data.projets?.length || 0}{' '}
            {language === 'fr' 
              ? `Réalisation${(data.projets?.length || 0) > 1 ? 's' : ''} répertoriée${(data.projets?.length || 0) > 1 ? 's' : ''}`
              : `Listed Project${(data.projets?.length || 0) > 1 ? 's' : ''}`
            }
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projets && data.projets.length > 0 ? (
            data.projets.map((projet) => {
              // Extraction des champs bilingues
              const titreProjet = getLocale(projet.titre, language);
              const descriptionProjet = getLocale(projet.description, language);

              return (
                <div 
                  key={projet.slug?.current } 
                  className="group bg-background rounded-[2rem] overflow-hidden border border-border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/10"
                >
                  {/* Image Hover Effect */}
                  <div className="relative h-72 overflow-hidden">
                    {projet.imagePrincipale ? (
                      <Image 
                        src={urlFor(projet.imagePrincipale).url()} 
                        alt={titreProjet || 'Image du projet'} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-muted text-muted-foreground italic">
                        {language === 'fr' ? 'Pas d\'image' : 'No image'}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    
                    {/* Badge Statut Traduit */}
                    {projet.statut && (
                      <div className="absolute top-6 left-6">
                        <span className="bg-brand text-brand-foreground px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                          {formatStatut(projet.statut)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h4 className="text-2xl font-heading font-bold mb-4 group-hover:text-brand transition-colors">
                      {titreProjet}
                    </h4>
                    <div className="text-muted-foreground text-sm mb-6 min-h-15">
                      {Array.isArray(descriptionProjet) ? (
                        <PortableText value={descriptionProjet} />
                      ) : (
                        <p>{descriptionProjet}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-[2rem]">
              <Icons.Ghost size={48} className="mx-auto text-muted-foreground mb-4 opacity-20" />
              <p className="text-muted-foreground italic">
                {language === 'fr' 
                  ? 'Aucune réalisation affichée pour le moment.' 
                  : 'No projects displayed at the moment.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}