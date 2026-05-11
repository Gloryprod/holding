import Header from "@/components/Home/layout/Header";
import Footer from "@/components/Home/layout/Footer";
import { Journey } from "@/components/About/Journey";
import { Values } from "@/components/About/Values";
import { AboutHero } from "@/components/About/AboutHero";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main >
        <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                
                {/* Texte à gauche */}
                <div className="lg:w-1/2 space-y-8">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-widest">
                    Notre Horizon
                    </div>
                    <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground leading-[1.1]">
                    Bâtir un écosystème où <span className="text-brand">l&apos;économie</span> nourrit <span className="text-brand">l&apos;humain</span>.
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                    Chez Obed Group, notre vision dépasse la simple gestion d&apos;actifs. nous croyons en une synergie circulaire : nos SARL génèrent l&apos;excellence et les ressources qui permettent à notre ONG et notre Coopérative de transformer durablement les vies.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                    <div className="border-l-2 border-brand pl-6">
                        <h4 className="font-bold text-foreground">Mission Sociale</h4>
                        <p className="text-sm text-muted-foreground mt-2">Autonomiser les communautés vulnérables par l&apos;éducation et la santé.</p>
                    </div>
                    <div className="border-l-2 border-brand pl-6">
                        <h4 className="font-bold text-foreground">Mission Économique</h4>
                        <p className="text-sm text-muted-foreground mt-2">Déployer des solutions industrielles innovantes et compétitives.</p>
                    </div>
                    </div>
                </div>

                {/* Visuel à droite (Bento de photos ou image abstraite) */}
                <div className="lg:w-1/2 relative">
                    <div className="grid grid-cols-2 gap-4">
                    <img 
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800" 
                        className="rounded-2xl aspect-square object-cover mt-12" 
                        alt="Collaboration" 
                    />
                    <img 
                        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800" 
                        className="rounded-2xl aspect-square object-cover" 
                        alt="Bureau" 
                    />
                    </div>
                    {/* Décoration : Un carré vert derrière */}
                    <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand/5 rounded-full blur-3xl"></div>
                </div>

                </div>
            </div>
        </section>
        <Journey />
        <Values />
      </main>
      <Footer />
    </>
  );
}