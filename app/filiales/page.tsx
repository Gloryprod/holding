import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import { ArrowRight, Heart, Sprout, Building2, Briefcase, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Home/layout/Header";
import Footer from "@/components/Home/layout/Footer";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import * as Icons from "lucide-react"; // Importe toutes les icônes

// const filiales = [
//   {
//     id: "ong",
//     name: "ONG",
//     tagline: "L'impact social au cœur du développement",
//     description: "Notre branche humanitaire dédiée à l'éducation, la santé et l'autonomisation des populations vulnérables. Nous transformons les ressources en opportunités réelles sur le terrain.",
//     icon: <Heart className="w-10 h-10" />,
//     color: "bg-blue-600",
//     image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800",
//     link: "/ong"
//   },
//   {
//     id: "coop",
//     name: "La Coopérative",
//     tagline: "L'union des forces pour une économie solidaire",
//     description: "Une structure de mutualisation permettant aux producteurs locaux d'accéder à de meilleurs marchés, des intrants de qualité et une formation technique continue.",
//     icon: <Sprout className="w-10 h-10" />,
//     color: "bg-emerald-600",
//     image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=800",
//     link: "/cooperative"
//   },
//   {
//     id: "sarl1",
//     name: "Obed Industrie (SARL)",
//     tagline: "L'excellence opérationnelle et industrielle",
//     description: "Spécialisée dans les solutions techniques et la production, cette entité porte les ambitions industrielles du groupe avec une exigence de qualité internationale.",
//     icon: <Building2 className="w-10 h-10" />,
//     color: "bg-brand",
//     image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800",
//     link: "/sarl1"
//   },
//   {
//     id: "sarl2",
//     name: "Obed Services (SARL)",
//     tagline: "Le partenaire stratégique de vos projets",
//     description: "Une filiale dédiée au consulting, à la logistique et aux services commerciaux haute performance pour accompagner la croissance de nos partenaires.",
//     icon: <Briefcase className="w-10 h-10" />,
//     color: "bg-slate-800",
//     image: "https://images.unsplash.com/photo-1454165833768-027ffea9e77b?q=80&w=800",
//     link: "/sarl2"
//   }
// ];

async function getEntreprises() {
  // On récupère les nouveaux champs : tagline, description et iconName
  const query = `*[_type == "entreprise"] {
    nom,
    tagline,
    description,
    iconName,
    "slug": slug.current,
    "image": imageCover.asset->url,
    "logo": logo.asset->url
  }`;
  const data = await client.fetch(query);
  return data;
}

interface Entreprise {
  nom: string;
  tagline: string;
  description: string;
  iconName: string;
  slug: string;
  image: string; // On suppose que l'image est gérée à part ou via un champ supplémentaire
}

export default async function FilialesPage() {
    const filiales = await getEntreprises();
  return (
    <>
    <main className="pt-24 bg-background">
      {/* Header de la page */}
      <section className="py-20 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-black text-foreground mb-6">
            Nos <span className="text-brand">Entités</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Découvrez les quatre piliers de Obed Group. Chaque structure possède son expertise propre tout en partageant une vision commune de l&apos;excellence.
          </p>
        </div>
      </section>

      {/* Liste des filiales avec alternance gauche/droite */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          {filiales.map((f : Entreprise, index: number) => (
            <div 
              key={f.slug} 
              className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image avec effet de profondeur */}
              <div className="lg:w-1/2 relative group">
                <div className={`absolute -inset-4 opacity-10 rounded-[2.5rem] blur-2xl group-hover:opacity-20 transition-opacity`}></div>
                <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-2xl">
                  <Image
                    src={urlFor(f.image).url()} // Image par défaut si non fournie
                    alt={f.nom}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 text-white">
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl inline-block mb-4">
                      {
                      (() => {
                        const IconComponent = Icons[f.iconName as keyof typeof Icons] as ComponentType<LucideProps>;
                        return IconComponent ? (
                          <IconComponent size={32} />
                        ) : (
                          <Icons.HelpCircle size={32} />
                        );
                      }
                      )()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenu textuel */}
              <div className="lg:w-1/2 space-y-6">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                  {f.nom}
                </h2>
                <p className="text-brand font-bold uppercase tracking-widest text-sm">
                  {f.tagline}
                </p>
                <p className="text-muted-foreground text-lg line-clamp-4 leading-relaxed italic">
                  {f.description}
                </p>
                
                <div className="pt-6">
                  <Link 
                    href={`/filiales/${f.slug}`}
                    className="inline-flex items-center gap-4 bg-foreground text-background px-8 py-4 rounded-2xl font-bold hover:bg-brand hover:text-white transition-all group"
                  >
                    Accéder à l&apos;espace dédié
                    <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section CTA Finale */}
      <section className="py-24 bg-brand text-brand-foreground text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-6">Besoin d&apos;une collaboration transversale ?</h2>
          <p className="mb-10 text-white/80">Nos entités travaillent souvent en synergie pour des projets complexes. Contactez la holding pour une solution sur mesure.</p>
          <Link href="/contact" className="bg-white text-brand px-10 py-4 rounded-xl font-bold hover:shadow-2xl transition-all">
            Nous contacter
          </Link>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}