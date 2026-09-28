"use client";

import { Send, Building2, User, Leaf, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { sendContactEmail } from "../app/actions/send-email";
import { useLanguage } from "@/context/LanguageContext";
import { getLocale } from "@/lib/getLocal"; // Fonction utilitaire pour obtenir la traduction appropriée
import { motion } from "framer-motion";

interface ContactFormProps {
  data: {
    nom: string;
    email: string;
    typeEntite: 'business' | 'social' | 'cooperative';
  };
}

export function ContactForm({ data }: ContactFormProps) {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const type = data?.typeEntite || 'business';
  const nom = getLocale(data.nom, language);
  

  const initialFormState = {
    name: "",
    email: "",
    profileType: type === 'social' ? "Particulier" : type === 'cooperative' ? "Producteur" : "Entreprise",
    subject: "",
    message: ""
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // État et référence pour le reCAPTCHA
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error(
        isFr
          ? "Veuillez cocher la case 'Je ne suis pas un robot'."
          : "Please check the 'I am not a robot' box."
      );
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await sendContactEmail(formData, data.nom, data.email, captchaToken);

      if (result.success) {
        toast.success(
          isFr 
            ? `Votre message a été envoyé avec succès à l'équipe de ${nom} !`
            : `Your message was successfully sent to the team at ${nom}!`
        );
        setFormData(initialFormState);
        // Réinitialiser le captcha
        recaptchaRef.current?.reset();
        setCaptchaToken(null);
      } else {
        toast.error(
          result.error || (
            isFr
              ? `Erreur lors de l'envoi, veuillez réessayer ultérieurement.`
              : `Error sending message, please try again later.`
          )
        );
        recaptchaRef.current?.reset();
        setCaptchaToken(null);
      }
    } catch (error: any) {
      if (
        error?.message?.includes("Failed to find Server Action") ||
        error?.digest?.includes("NEXT_REDIRECT")
      ) {
        toast.error(
          isFr 
            ? "La page a été mise à jour. Rechargement en cours..."
            : "The page was updated. Reloading..."
        );
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        console.error("Erreur soumission formulaire:", error);
        toast.error(
          isFr
            ? "Une erreur inattendue est survenue. Veuillez réessayer."
            : "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getProfileSelector = () => {
    if (type === 'social') {
      return (
        <div className="space-y-2">
          <label className="text-sm font-bold ml-1 flex items-center gap-2">
            <User size={16} /> {isFr ? "Vous nous contactez en tant que :" : "You are contacting us as:"}
          </label>
          <select 
            value={formData.profileType}
            className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-border focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none appearance-none cursor-pointer transition-all"
            onChange={(e) => setFormData({...formData, profileType: e.target.value})}
          >
            <option value="Particulier" className="text-black">
              {isFr ? "Un Particulier / Citoyen" : "An Individual / Citizen"}
            </option>
            <option value="Benevole" className="text-black">
              {isFr ? "Un Futur Bénévole" : "A Future Volunteer"}
            </option>
            <option value="Donateur" className="text-black">
              {isFr ? "Un Donateur / Partenaire Financier" : "A Donor / Financial Partner"}
            </option>
            <option value="Association" className="text-black">
              {isFr ? "Une Association / Autre ONG" : "An Association / NGO"}
            </option>
          </select>
        </div>
      );
    }

    if (type === 'cooperative') {
      return (
        <div className="space-y-2">
          <label className="text-sm font-bold ml-1 flex items-center gap-2">
            <Leaf size={16} /> {isFr ? "Votre profil :" : "Your profile:"}
          </label>
          <select 
            value={formData.profileType}
            className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-border focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none appearance-none cursor-pointer transition-all"
            onChange={(e) => setFormData({...formData, profileType: e.target.value})}
          >
            <option value="Producteur" className="text-black">
              {isFr ? "Producteur / Agriculteur" : "Producer / Farmer"}
            </option>
            <option value="Acheteur" className="text-black">
              {isFr ? "Distributeur / Acheteur Professionnel" : "Distributor / Professional Buyer"}
            </option>
            <option value="Fournisseur" className="text-black">
              {isFr ? "Fournisseur d'Équipements" : "Equipment Supplier"}
            </option>
            <option value="Partenaire" className="text-black">
              {isFr ? "Partenaire Technique" : "Technical Partner"}
            </option>
          </select>
        </div>
      );
    }

    // Mode Business (Default)
    return (
      <div className="space-y-2">
        <label className="text-sm font-bold ml-1 flex items-center gap-2">
          <Building2 size={16} /> {isFr ? "Type d'organisation :" : "Organization type:"}
        </label>
        <select 
          value={formData.profileType}
          className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-border focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none appearance-none cursor-pointer transition-all"
          onChange={(e) => setFormData({...formData, profileType: e.target.value})}
        >
          <option value="Entreprise" className="text-black">
            {isFr ? "Entreprise / SARL" : "Company / Corporate"}
          </option>
          <option value="Gouvernement" className="text-black">
            {isFr ? "Institutionnel / État" : "Government / Institutional"}
          </option>
          <option value="Particulier" className="text-black">
            {isFr ? "Client Particulier" : "Individual Client"}
          </option>
          <option value="Partenaire" className="text-black">
            {isFr ? "Partenaire Commercial" : "Commercial Partner"}
          </option>
        </select>
      </div>
    );
  };

  const getTitle = () => {
    return isFr ? "Laissez-nous un message" : "Leave us a message";
  };

  const getSubjectPlaceholder = () => {
    if (type === 'social') return isFr ? "Ex: Devenir bénévole" : "Ex: Becoming a volunteer";
    if (type === 'cooperative') return isFr ? "Ex: Achat en gros de récoltes" : "Ex: Bulk harvest purchase";
    return isFr ? "Ex: Demande de cotation" : "Ex: Request for quote";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-background border border-border p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-brand/5"
    >
      <div>
        <h3 className="text-3xl font-heading font-bold mb-6 mt-4 text-brand text-center">
          {getTitle()}
        </h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nom Complet */}
          <div className="space-y-2">
            <label className="text-sm font-bold ml-1">
              {isFr ? "Nom complet" : "Full name"}
            </label>
            <input 
              type="text" 
              required
              value={formData.name}
              placeholder={isFr ? "Ex: John Doe" : "e.g. John Doe"}
              className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-border focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-bold ml-1">
              {isFr ? "Adresse Email" : "Email address"}
            </label>
            <input 
              type="email" 
              required
              value={formData.email}
              placeholder="adresse@exemple.com"
              className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-border focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>

        {/* Dynamic Selector */}
        {getProfileSelector()}

        {/* Sujet */}
        <div className="space-y-2">
          <label className="text-sm font-bold ml-1">
            {isFr ? "Sujet" : "Subject"}
          </label>
          <input 
            type="text" 
            required
            value={formData.subject}
            placeholder={getSubjectPlaceholder()}
            className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-border focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label className="text-sm font-bold ml-1">Message</label>
          <textarea 
            rows={4}
            required
            value={formData.message}
            placeholder={
              isFr 
                ? "Expliquez en quelques mots l'objet de votre démarche..."
                : "Briefly describe the purpose of your request..."
            }
            className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-border focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all resize-none"
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
        </div>

        {/* Widget Google reCAPTCHA */}
        <div className="flex justify-center my-4 overflow-x-auto">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            onChange={(token: string | null) => setCaptchaToken(token)}
            hl={isFr ? "fr" : "en"}
          />
        </div>

        {/* Submit Button Animé */}
        <motion.button 
          type="submit" 
          disabled={isSubmitting || !captchaToken}
          whileHover={{ scale: isSubmitting || !captchaToken ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting || !captchaToken ? 1 : 0.98 }}
          className="cursor-pointer w-full flex items-center justify-center gap-3 bg-brand text-brand-foreground py-4 rounded-2xl font-bold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-brand/20 group"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>{isFr ? "Envoi en cours..." : "Sending..."}</span>
            </>
          ) : (
            <>
              <span>{isFr ? "Envoyer le message" : "Send Message"}</span>
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}