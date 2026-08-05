'use client';
import { ThemeToggle } from "@/components/ThemeToggle";
import  Link  from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { urlFor } from "@/sanity/lib/image";

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
    logo: string;
    services: {
      titre: string;
      description: string;
    }[]

  }

  export default function Header({ data }: { data: Entreprise }) {
 
  const [open, setOpen] = useState(false);
  const desktopNavLinks = [
    { label: "À propos", href: `/about` },
    { label: "Pourquoi investir ?", href: `/partners` },
    { label: "Contact", href: `/contact` },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-transparent shadow backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo / Brand Link */}
        <Link href="/" className="flex items-center gap-1 group">
          {data?.logo ? (
            /* Le conteneur définit des dimensions claires pour l'image */
            <div className="relative w-auto h-10 md:h-12 aspect-3/1 flex items-center">
              <Image 
                src={urlFor(data.logo).url()} 
                alt={data?.nom || "Logo"} 
                width={200}
                height={60}
                className="w-auto h-full object-contain dark:brightness-0 dark:invert"
                priority
              />
            </div>
          ) : (
            /* Nom de secours si pas de logo */
            <span className="text-xl md:text-2xl font-heading font-black text-brand tracking-tight">
              {data?.nom || "Obed Group"}
            </span>
          )}
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex space-x-8">
            {desktopNavLinks.map((link, index) => (
              <li key={index}>
                <Link 
                  href={link.href} 
                  className="text-sm font-medium text-muted-foreground hover:text-brand transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          
          <Link 
            href="/contact" 
            className="hidden sm:block bg-brand text-brand-foreground px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-all"
          >
            Rejoignez-nous !
          </Link>

          <ThemeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
                <button className="cursor-pointer p-2 rounded-lg hover:bg-muted transition-colors outline-none">
                <Menu className="w-7 h-7 text-foreground" />
                </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full max-w-xs bg-background border-l border-border p-0">
                <div className="flex flex-col h-full">

                <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
                <div className="flex items-center justify-between pt-8 pb-6 px-6 border-b border-border/50">
                    <div className="flex items-center gap-2">
                    <span className="text-2xl font-heading font-black text-brand italic">
                        Holding
                    </span>
                    </div>
                </div>
                

                <nav className="flex-1 px-6 py-8 flex flex-col">
                    <div className="space-y-2">
                    {desktopNavLinks.map((link) => (
                        <SheetClose asChild key={link.label}>
                        <Link
                            href={link.href}
                            className="block text-lg font-bold text-foreground/80 hover:text-brand hover:translate-x-2 transition-all py-4 border-b border-border/40 last:border-0"
                            onClick={() => setOpen(false)}
                        >
                            {link.label}
                        </Link>
                        </SheetClose>
                    ))}
                    </div>

                    {/* Zone d'action en bas du menu */}
                    <div className="mt-auto pb-10 pt-6 space-y-4">
                   
                        <Link href="/contact" className="w-full block">
                            <Button 
                            className="cursor-pointer w-full bg-brand text-brand-foreground py-6 rounded-2xl text-base font-bold shadow-lg shadow-brand/20 hover:opacity-90 transition-all"
                            onClick={() => setOpen(false)}
                            >
                            Nous rejoindre
                            </Button>
                        </Link>
                    </div>
                </nav>

                </div>
            </SheetContent>
        </Sheet>
          
        </div>
      </div> 
    </header>
  );
}