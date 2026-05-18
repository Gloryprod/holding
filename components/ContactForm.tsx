"use client";

import { Send, Building2, User, Leaf } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { sendContactEmail } from "../app/actions/send-email";

interface ContactFormProps {
  data: {
    nom: string;
    typeEntite: 'business' | 'social' | 'cooperative';
  };
}

export function ContactForm({ data }: ContactFormProps) {
  const type = data?.typeEntite || 'business';

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileType: type === 'social' ? "Particulier" : type === 'cooperative' ? "Producteur" : "Entreprise",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await sendContactEmail(formData, data.nom, "gracia.ouinsou@gmail.com");
    
    setIsSubmitting(false);

    if (result.success) {
      toast.success(`Votre message a été envoyé avec succès à l'équipe de ${data.nom} !`);
      // Optionnel : réinitialiser le formulaire ici
    } else {
      toast.error(`Erreur lors de l'envoi : ${result.error}`);
    }
  };

  // Configuration des options du sélecteur selon l'activité
  const getProfileSelector = () => {
    if (type === 'social') {
      return (
        <div className="space-y-2">
          <label className="text-sm font-bold ml-1 flex items-center gap-2">
            <User size={16} /> Vous nous contactez en tant que :
          </label>
          <select 
            value={formData.profileType}
            className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-border focus:border-brand outline-none appearance-none cursor-pointer"
            onChange={(e) => setFormData({...formData, profileType: e.target.value})}
          >
            <option value="Particulier" className="text-black">Un Particulier / Citoyen</option>
            <option value="Benevole" className="text-black">Un Futur Bénévole</option>
            <option value="Donateur" className="text-black">Un Donateur / Partenaire Financier</option>
            <option value="Association" className="text-black">Une Association / Autre ONG</option>
          </select>
        </div>
      );
    }

    if (type === 'cooperative') {
      return (
        <div className="space-y-2">
          <label className="text-sm font-bold ml-1 flex items-center gap-2">
            <Leaf size={16} /> Votre profil :
          </label>
          <select 
            value={formData.profileType}
            className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-border focus:border-brand outline-none appearance-none cursor-pointer"
            onChange={(e) => setFormData({...formData, profileType: e.target.value})}
          >
            <option value="Producteur" className="text-black">Producteur / Agriculteur</option>
            <option value="Acheteur" className="text-black">Distributeur / Acheteur Professionnel</option>
            <option value="Fournisseur" className="text-black">Fournisseur d&apos;Équipements</option>
            <option value="Partenaire" className="text-black">Partenaire Technique</option>
          </select>
        </div>
      );
    }

    // Mode Business (Default)
    return (
      <div className="space-y-2">
        <label className="text-sm font-bold ml-1 flex items-center gap-2">
          <Building2 size={16} /> Type d&apos;organisation :
        </label>
        <select 
          value={formData.profileType}
          className="w-full px-5 py-4  rounded-2xl bg-muted/50 border border-border focus:border-brand outline-none appearance-none cursor-pointer"
          onChange={(e) => setFormData({...formData, profileType: e.target.value})}
        >
          <option value="Entreprise" className="text-black">Entreprise / SARL</option>
          <option value="Gouvernement" className="text-black">Institutionnel / État</option>
          <option value="Particulier" className="text-black">Client Particulier</option>
          <option value="Partenaire" className="text-black">Partenaire Commercial</option>
        </select>
      </div>
    );
  };

  return (
    <div className="bg-background border border-border p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-brand/5">
      <div>
        <h3 className="text-3xl font-heading font-bold mb-6 mt-4 text-brand text-center">
          {type === 'social' ? "Soutenir notre action" : type === 'cooperative' ? "Écrivez à la coopérative" : "Contactez nos experts"}
        </h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nom Complet */}
          <div className="space-y-2">
            <label className="text-sm font-bold ml-1">Nom complet</label>
            <input 
              type="text" 
              required
              placeholder="Ex: Gloria Ouinsou"
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
              placeholder="adresse@exemple.com"
              className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-border focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>

        {/* Injection du sélecteur dynamique */}
        {getProfileSelector()}

        {/* Sujet */}
        <div className="space-y-2">
          <label className="text-sm font-bold ml-1">Sujet</label>
          <input 
            type="text" 
            required
            placeholder={type === 'social' ? "Ex: Devenir bénévole" : type === 'cooperative' ? "Ex: Achat en gros de récoltes" : "Ex: Demande de cotation"}
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
            placeholder="Expliquez en quelques mots l'objet de votre démarche..."
            className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-border focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all resize-none"
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
        </div>

        {/* Bouton d'envoi */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="cursor-pointer w-full flex items-center justify-center gap-3 bg-brand text-brand-foreground py-4 rounded-2xl font-bold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-brand/20 group"
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
          <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </form>
    </div>
  );
}