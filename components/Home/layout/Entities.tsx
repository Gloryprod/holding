import { Heart, Sprout, Building2, Briefcase, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import * as Icons from "lucide-react";

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

}

export default function Entities({ data }: { data: Entreprise }) {
  return (
    <section id="features" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Grille des entités */}
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-8">
          <div className="mb-12 h-auto flex flex-col col-span-3">
            <h1 className="text-2xl font-heading font-bold flex items-center gap-3">
              <Icons.EarthLockIcon className="text-brand" /> A propos de nous !
            </h1>
            <p className="m-4">
              {data.description}
            </p>

            <h2 className="text-xl font-bold text-brand ml-4 mb-3">Mission & Vision</h2>
            <p className="ml-4 mb-2">{data.mission}</p>
          </div>

          <div className="relative col-span-2 hover:scale-105 transition-transform duration-300 rounded-lg overflow-hidden">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={data.image} 
                  alt={data.nom}
                  width={500}
                  height={600}
                  className="w-80 h-100 object-cover rounded-lg"
                />
              </div>
              {/* <div className="absolute -inset-4 opacity-10 rounded-[2.5rem] blur-2xl group-hover:opacity-20 transition-opacity"></div> */}
              <div className="absolute bottom-0 right-6 z-40 m-4 rotate-y-15 rotate-z-15">
                <div className="hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/hero5.jpg" 
                    alt={data.nom}
                    width={200}
                    height={350}
                    className="w-50 h-60 object-cover rounded-lg "
                  />
                </div>
              </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}