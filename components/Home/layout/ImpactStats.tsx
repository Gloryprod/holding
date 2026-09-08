"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Users, Calendar, Trophy } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ImpactStats() {
  const { language } = useLanguage();

  const stats = [
    {
      label: {
        fr: "Projets réalisés",
        en: "Completed Projects",
      },
      value: "150",
      suffix: "+",
      icon: <CheckCircle2 className="w-5 h-5 text-brand" />,
    },
    {
      label: {
        fr: "Bénéficiaires & Clients",
        en: "Beneficiaries & Clients",
      },
      value: "12",
      suffix: "k",
      icon: <Users className="w-5 h-5 text-brand" />,
    },
    {
      label: {
        fr: "Années d'expérience",
        en: "Years of Experience",
      },
      value: "25",
      suffix: "",
      icon: <Calendar className="w-5 h-5 text-brand" />,
    },
    {
      label: {
        fr: "Partenaires mondiaux",
        en: "Global Partners",
      },
      value: "40",
      suffix: "+",
      icon: <Trophy className="w-5 h-5 text-brand" />,
    },
  ];

  return (
    <section className="py-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-3">
            {language === 'fr' ? 'Notre Impact en Chiffres' : 'Our Impact in Numbers'}
          </h2>
          <p className="text-3xl md:text-4xl font-heading font-bold text-foreground max-w-2xl">
            {language === 'fr' 
              ? "Des résultats concrets qui parlent d'eux-mêmes" 
              : "Concrete results that speak for themselves"}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-background shadow-sm border border-border/50"
            >
              {/* Icône avec cercle léger */}
              <div className="mb-4 p-3 rounded-full bg-brand/10">
                {stat.icon}
              </div>

              {/* Chiffre */}
              <div className="text-4xl md:text-5xl font-heading font-black text-foreground mb-2">
                {stat.value}
                <span className="text-brand">{stat.suffix}</span>
              </div>

              {/* Label */}
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                {stat.label[language]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}