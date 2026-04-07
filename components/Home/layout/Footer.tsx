import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Colonne 1 : À propos */}
          <div className="space-y-6">
            <h3 className="text-2xl font-heading font-bold text-foreground">
              Obed <span className="text-brand">Group</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Une holding multi-sectorielle dédiée au développement durable, 
              alliant impact social et performance économique à travers nos filiales.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full border border-border hover:bg-brand hover:text-white transition-colors">
                <Mail size={18} />
              </a>
              <a href="#" className="p-2 rounded-full border border-border hover:bg-brand hover:text-white transition-colors">
                <Mail size={18} />
              </a>
              <a href="#" className="p-2 rounded-full border border-border hover:bg-brand hover:text-white transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Colonne 2 : Liens Rapides */}
          <div>
            <h4 className="font-bold mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#hero" className="hover:text-brand transition-colors">Accueil</a></li>
              <li><a href="#features" className="hover:text-brand transition-colors">Nos Entités</a></li>
              <li><a href="#team" className="hover:text-brand transition-colors">Gouvernance</a></li>
              <li><a href="#news" className="hover:text-brand transition-colors">Actualités</a></li>
            </ul>
          </div>

          {/* Colonne 3 : Les Espaces Dédiés */}
          <div>
            <h4 className="font-bold mb-6">Nos Espaces</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="/ong" className="flex items-center gap-2 hover:text-brand transition-colors">Espace ONG <ArrowUpRight size={14}/></a></li>
              <li><a href="/cooperative" className="flex items-center gap-2 hover:text-brand transition-colors">La Coopérative <ArrowUpRight size={14}/></a></li>
              <li><a href="/sarl1" className="flex items-center gap-2 hover:text-brand transition-colors">SARL Industrie <ArrowUpRight size={14}/></a></li>
              <li><a href="/sarl2" className="flex items-center gap-2 hover:text-brand transition-colors">SARL Services <ArrowUpRight size={14}/></a></li>
            </ul>
          </div>

          {/* Colonne 4 : Contact Direct */}
          <div>
            <h4 className="font-bold mb-6">Nous Contacter</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand shrink-0" />
                <span>Siège Social, Rue de la Synergie, <br /> Ville, Pays</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand shrink-0" />
                <span>+XXX XX XX XX XX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand shrink-0" />
                <span>contact@obedgroup.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 3. Copyright et Légal */}
        <div className="border-t border-border pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-muted-foreground font-medium uppercase tracking-widest">
          <p>© {currentYear} Obed Group. Tous droits réservés.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand">Mentions Légales</a>
            <a href="#" className="hover:text-brand">Politique de Confidentialité</a>
          </div>
        </div>

      </div>
    </footer>
  );
}