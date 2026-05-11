
import { Mail, Phone, MapPin, Send, Building2, Handshake, Contact } from "lucide-react";
import { getEntityData } from "@/lib/getEntityData";  
import { ContactForm } from "@/components/ContactForm";

export default async function ContactPage({params}: {params: Promise<{ subdomain: string }>}) {
  const { subdomain } = await params;
  const data = await getEntityData(subdomain);
   
  return (
    <>
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Colonne Gauche : Infos de contact */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-[0.2em]">
                <Contact size={14} /> Contactez-Nous
              </div>              
              <h3 className="text-4xl font-heading font-black text-foreground mb-6">
                Prêt à rejoindre <span className="text-brand">l&apos;écosystème ?</span>
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Que vous soyez une institution publique, une entreprise ou un investisseur privé, nous sommes à votre écoute pour discuter de synergies durables.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: <Phone size={20} />, label: "Téléphone", value: data.telephone || "+123 456 7890" },
                { icon: <Mail size={20} />, label: "Email", value: data.email || "contact@obedgroup.com" },
                { icon: <MapPin size={20} />, label: "Siège Social", value: data.address || "Rue de la Synergie, Ville, Pays"  },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                  <div className="p-3 bg-brand/10 text-brand rounded-xl">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">{item.label}</p>
                    <p className="font-semibold text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne Droite : Le Formulaire */}
          <ContactForm />
        </div>
      </div>
    </section>
    </>
  );
}