"use client";

import { Mail, Phone, MapPin, Send, Building2, Handshake, Contact } from "lucide-react";
import { useState } from "react";

export function ContactForm() {
 
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
    </> 
  );
}