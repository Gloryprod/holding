'use client';

import { Mail, Phone, MapPin, Contact } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage({ data }: { data: any }) {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const contactItems = [
    { 
      icon: <Phone size={20} />, 
      label: isFr ? "Téléphone" : "Phone", 
      value: data?.telephone || "+123 456 7890" 
    },
    { 
      icon: <Mail size={20} />, 
      label: isFr ? "Email" : "Email", 
      value: "contact@horyzion.com" 
    },
    { 
      icon: <MapPin size={20} />, 
      label: isFr ? "Siège Social" : "Headquarters", 
      value: data?.address || (isFr ? "Rue de la Synergie, Ville, Pays" : "Synergy Street, City, Country") 
    },
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Colonne Gauche : Infos de contact */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-[0.2em]">
                <Contact size={14} /> {isFr ? "Contactez-Nous" : "Contact Us"}
              </div>              
              
              <h3 className="text-4xl font-heading font-black text-foreground mb-6">
                {isFr ? "Prêt à rejoindre " : "Ready to join "}
                <span className="text-brand">
                  {isFr ? "l'écosystème ?" : "the ecosystem?"}
                </span>
              </h3>
              
              <p className="text-muted-foreground text-lg leading-relaxed">
                {isFr 
                  ? "Que vous soyez une institution publique, une entreprise, un particulier ou un investisseur privé, nous sommes à votre écoute pour discuter de synergies durables."
                  : "Whether you are a public institution, a company, an individual, or a private investor, we are here to discuss sustainable synergies."}
              </p>
            </div>

            <div className="space-y-6">
              {contactItems.map((item, i) => (
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
          <ContactForm data={data} />
        </div>
      </div>
    </section>
  );
}