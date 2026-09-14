"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { CheckCircle2, Users, Calendar, Trophy } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Variants } from "framer-motion";

// Composant interne pour l'animation du compteur numérique
function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ImpactStats({ data }: { data: any }) {
  const { language } = useLanguage();

  const stats = [
    {
      label: {
        fr: "Projets réalisés",
        en: "Completed Projects",
      },
      numericValue: data.nombre_projets,
      suffix: "+",
      icon: CheckCircle2,
    },
    {
      label: {
        fr: "Bénéficiaires & Clients",
        en: "Beneficiaries & Clients",
      },
      numericValue: data.nombre_beneficiaires,
      suffix: "",
      icon: Users,
    },
    {
      label: {
        fr: "Années d'expérience",
        en: "Years of Experience",
      },
      numericValue: data.nombre_annees_experience,
      suffix: "",
      icon: Calendar,
    },
    {
      label: {
        fr: "Partenaires mondiaux",
        en: "Global Partners",
      },
      numericValue: data.nombre_partenaires,
      suffix: "+",
      icon: Trophy,
    },
  ];

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Halo lumineux de fond */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-brand/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header de section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="text-xs font-bold text-brand uppercase tracking-widest mb-3 px-3 py-1 bg-brand/10 rounded-full">
            {language === "fr" ? "Notre Impact en Chiffres" : "Our Impact in Numbers"}
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground max-w-2xl leading-tight">
            {language === "fr"
              ? "Des résultats concrets qui parlent d'eux-mêmes"
              : "Concrete results that speak for themselves"}
          </h2>
        </motion.div>

        {/* Grille de statistiques */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-background shadow-sm border border-border/60 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5 transition-all duration-300"
              >
                {/* Icône animée */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="mb-5 p-4 rounded-2xl bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-colors duration-300 shadow-sm"
                >
                  <Icon className="w-6 h-6" />
                </motion.div>

                {/* Chiffre animé */}
                <div className="text-4xl md:text-5xl font-heading font-black text-foreground mb-2 flex items-center justify-center">
                  <AnimatedNumber value={stat.numericValue} />
                  <span className="text-brand">{stat.suffix}</span>
                </div>

                {/* Label */}
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {stat.label[language]}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}