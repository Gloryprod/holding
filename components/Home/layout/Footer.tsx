import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { FacebookIcon, LinkedinIcon } from "./Team";

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
  linkedin: string;
  facebook: string;
  services: {
    titre: string;
    description: string;
  }[]

}

export default function Footer({ data }: { data: Entreprise }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 1. Section Partenaires / Logos (Confiance) */}
        <div className="mb-20">
          <p className="text-center text-sm font-bold text-muted-foreground uppercase tracking-[0.2em] mb-10">
            Ils nous font confiance
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Remplace par tes vrais logos de partenaires */}
            <div className="h-8 w-32 bg-muted rounded-md animate-pulse"></div>
            <div className="h-8 w-32 bg-muted rounded-md animate-pulse"></div>
            <div className="h-8 w-32 bg-muted rounded-md animate-pulse"></div>
            <div className="h-8 w-32 bg-muted rounded-md animate-pulse"></div>
          </div>
        </div>

        <hr className="border-border mb-20" />

        {/* 2. Grille Principale du Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          
          {/* Colonne 1 : À propos */}
          <div className="space-y-6">
            <h3 className="text-2xl font-heading font-bold text-foreground">
              <span className="text-brand">{data.nom}</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {data.tagline || "Votre partenaire de confiance pour un avenir meilleur."}
            </p>
            <div className="flex gap-4">
              <a href={data.email} className="cursor-pointer p-2 rounded-full border border-border hover:bg-brand hover:text-white transition-colors">
                <Mail size={18} />
              </a>
              <a href={data.linkedin} className="cursor-pointer p-2 rounded-full border border-border hover:bg-brand hover:text-white transition-colors">
                <LinkedinIcon size={18} />
              </a>
              <a href={data.facebook} className="cursor-pointer p-2 rounded-full border border-border hover:bg-brand hover:text-white transition-colors">
                <FacebookIcon size={18} />
              </a>
            </div>
          </div>

          {/* Colonne 2 : Liens Rapides */}
          <div>
            <h4 className="font-bold mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-brand transition-colors">Accueil</Link></li>
              <li><Link href="/about" className="hover:text-brand transition-colors">Nos projets</Link></li>
              <li><Link href="/contact" className="hover:text-brand transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Colonne 4 : Contact Direct */}
          <div>
            <h4 className="font-bold mb-6">Nous Contacter</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand shrink-0" />
                <span>Siège Social {data.adresse}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand shrink-0" />
                <span>{data.telephone || "+33 1 23 45 67 89"}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand shrink-0" />
                <span>{data.email || "contact@obedgroup.com"}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 3. Copyright et Légal */}
        <div className="border-t border-border pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-muted-foreground font-medium uppercase tracking-widest">
          <p>© {currentYear} {data.nom}. Tous droits réservés.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-brand">Mentions Légales</Link>
            <Link href="#" className="hover:text-brand">Politique de Confidentialité</Link>
          </div>
        </div>

      </div>
    </footer> 
  );
}