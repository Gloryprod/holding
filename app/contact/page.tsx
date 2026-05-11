"use client";

import { Mail, Phone, MapPin, Send, Building2, Handshake, Contact } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Home/layout/Header";
import Footer from "@/components/Home/layout/Footer";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orgType: "Entreprise",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Données envoyées :", formData);
    // Ici, tu intégreras ton service d'envoi (EmailJS, Resend, etc.)
    alert("Message envoyé avec succès à Obed Group !");
  };

  return (
    <>
    <Header />
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
                { icon: <Phone size={20} />, label: "Téléphone", value: "+XXX XX XX XX XX" },
                { icon: <Mail size={20} />, label: "Email", value: "contact@obedgroup.com" },
                { icon: <MapPin size={20} />, label: "Siège Social", value: "Rue de la Synergie, Ville, Pays" },
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
          <div className="bg-background border border-border p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-brand/5">
            <div>
                <h3 className="text-3xl font-heading font-bold mb-6 mt-4 text-brand text-center">Envoyez-nous un message !</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nom Complet */}
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">Nom complet</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Jean Dupont"
                    className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-border focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">Adresse Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="jean@entreprise.com"
                    className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-border focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              {/* SÉLECTEUR DE TYPE D'ORGANISATION (Ton besoin spécifique) */}
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1 flex items-center gap-2">
                  <Building2 size={16} /> Type d&apos;organisation
                </label>
                <select 
                  className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-border focus:border-brand outline-none appearance-none cursor-pointer"
                  onChange={(e) => setFormData({...formData, orgType: e.target.value})}
                >
                  <option value="Entreprise">Entreprise / SARL</option>
                  <option value="Gouvernement">Gouvernement / Institutionnel</option>
                  <option value="ONG">ONG / Association</option>
                  <option value="Particulier">Investisseur Particulier</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              {/* Sujet */}
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Sujet</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Proposition de partenariat"
                  className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-border focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Message</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Décrivez votre projet ou votre demande..."
                  className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-border focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all resize-none"
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              {/* Bouton d'envoi */}
              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-3 bg-brand text-brand-foreground py-4 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-brand/20 group"
              >
                Envoyer le message
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
    <Footer />
    </>
  );
}