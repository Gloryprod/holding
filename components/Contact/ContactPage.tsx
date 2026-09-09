'use client';

import { Mail, Phone, MapPin, Contact } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

// Variants Framer Motion pour les séquences d'animation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const formVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

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
    <section id="contact" className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Colonne Gauche : Infos de contact animées */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            <div>
              <motion.div 
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-[0.2em]"
              >
                <Contact size={14} /> {isFr ? "Contactez-Nous" : "Contact Us"}
              </motion.div>              
              
              <motion.h3 variants={itemVariants} className="text-4xl font-heading font-black text-foreground mb-6">
                {isFr ? "Prêt à rejoindre " : "Ready to join "}
                <span className="text-brand">
                  {isFr ? "l'écosystème ?" : "the ecosystem?"}
                </span>
              </motion.h3>
              
              <motion.p variants={itemVariants} className="text-muted-foreground text-lg leading-relaxed">
                {isFr 
                  ? "Que vous soyez une institution publique, une entreprise, un particulier ou un investisseur privé, nous sommes à votre écoute pour discuter de synergies durables."
                  : "Whether you are a public institution, a company, an individual, or a private investor, we are here to discuss sustainable synergies."}
              </motion.p>
            </div>

            <motion.div variants={containerVariants} className="space-y-6">
              {contactItems.map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  whileHover={{ x: 6, backgroundColor: "rgba(var(--brand-rgb), 0.03)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50 transition-colors duration-300"
                >
                  <div className="p-3 bg-brand/10 text-brand rounded-xl">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">{item.label}</p>
                    <p className="font-semibold text-foreground">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Colonne Droite : Le Formulaire animé */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <ContactForm data={data} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}