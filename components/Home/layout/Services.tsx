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


export default function Services({data}: {data: Entreprise}) {
  return (
    <section id="news" className="py-12 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Grille de projets */}
        <div className="lg:col-span-5 space-y-8">
            <h3 className="text-2xl font-heading font-bold flex items-center gap-3">
            <Icons.Layers className="text-brand" /> Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.services?.map((service: { titre: string; description: string }, i: number) => (
                <div key={i} className="group p-6 bg-background rounded-3xl border border-border hover:border-brand/50 hover:shadow-xl hover:shadow-brand/5 transition-all duration-300">
                <div className="flex items-start gap-4">
                    <div className="mt-1 shrink-0 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-xs">
                    0{i + 1}
                    </div>
                    <div>
                    <h4 className="font-bold text-foreground mb-2 group-hover:text-brand transition-colors">{service.titre}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
      </div>
    </section>
  );
}