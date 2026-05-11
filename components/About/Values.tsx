import { ShieldCheck, Target, Zap, HeartHandshake } from "lucide-react";

const values = [
  { icon: <ShieldCheck />, title: "Intégrité", desc: "La transparence totale dans nos actions sociales et commerciales." },
  { icon: <Target />, title: "Excellence", desc: "Une exigence de qualité supérieure dans chaque service de nos SARL." },
  { icon: <HeartHandshake />, title: "Solidarité", desc: "L'humain reste au cœur de notre modèle économique." },
  { icon: <Zap />, title: "Innovation", desc: "Anticiper les besoins pour créer des solutions durables." },
];

export function Values() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-3xl font-heading font-bold mb-16">Nos Valeurs Fondamentales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div key={i} className="p-8 bg-background rounded-2xl border border-border hover:shadow-lg transition-all text-center">
              <div className="inline-flex p-3 bg-brand/10 text-brand rounded-xl mb-6">
                {v.icon}
              </div>
              <h4 className="font-bold mb-3">{v.title}</h4>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}