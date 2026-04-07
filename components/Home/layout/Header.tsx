import { ThemeToggle } from "@/components/ThemeToggle";
import  Link  from "next/link";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full bg-transparent z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo avec ta couleur Brand (Vert) */}
        <h1 className="text-2xl font-heading font-bold text-brand tracking-tight">
          Holding
        </h1>

        {/* Navigation centrale */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {[
              ["À propos", "#hero"],
              ["Filiales", "#features"],
              ["Partenaires", "#about"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link 
                  href={href} 
                  className="text-sm font-medium text-muted-foreground hover:text-brand transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions à droite */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {/* Un petit bouton d'appel à l'action discret en vert */}
          <a 
            href="#contact" 
            className="hidden sm:block bg-brand text-brand-foreground px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-all"
          >
            Démarrer
          </a>
        </div>
      </div>
    </header>
  );
}