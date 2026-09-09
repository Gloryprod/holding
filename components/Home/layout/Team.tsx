'use client';

import { Mail } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "@/sanity/lib/client";
import { Variants } from "framer-motion";

// Context d'Internationalisation et utilitaire
import { useLanguage } from "@/context/LanguageContext";
import { getLocale } from "@/lib/getLocal";

type LocalizedString = string | { fr?: string; en?: string };

interface Member {
  name: string;
  role: LocalizedString;
  description?: LocalizedString;
  image: string;
  linkedin: string;
  mail: string;
}

export function FacebookIcon({ size = 20, className = "" }: { size?: number, className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function LinkedinIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// Variants Framer Motion
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Team() {
  const { language } = useLanguage();
  const [teamMembers, setTeamMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const query = `*[_type == "membre"] {
          name,
          role,
          description,
          "image": image.asset->url,
          linkedin,
          mail
        }`;
        const data = await client.fetch(query);
        setTeamMembers(data || []);
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTeam();
  }, []);

  return (
    <section id="team" className="py-20 bg-background relative overflow-hidden">
      {/* Halo décoratif d'arrière-plan */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand/5 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* En-tête de section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold text-brand uppercase tracking-[0.2em] mb-3 inline-block px-3 py-1 bg-brand/10 rounded-full">
            {language === 'fr' ? 'Gouvernance' : 'Governance'}
          </span>
          <h3 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground mb-6">
            {language === 'fr' ? 'Notre Équipe' : 'Our Team'}
          </h3>
          <p className="max-w-2xl mx-auto text-muted-foreground text-base md:text-lg leading-relaxed">
            {language === 'fr'
              ? 'Une expertise pluridisciplinaire unie pour piloter notre croissance et maximiser notre impact global.'
              : 'Multidisciplinary expertise united to drive our growth and maximize our global impact.'}
          </p>
        </motion.div>

        {/* Skeleton de chargement */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse flex flex-col items-center">
                <div className="w-full aspect-[4/5] bg-muted rounded-3xl mb-4" />
                <div className="h-5 w-3/4 bg-muted rounded mb-2" />
                <div className="h-4 w-1/2 bg-muted rounded" />
              </div>
            ))}
          </div>
        ) : (
          /* Grille des membres */
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10"
          >
            {teamMembers.map((member: Member, index: number) => {
              const roleTranslated = getLocale(member.role, language);
              const descriptionTranslated = getLocale(member.description, language);

              return (
                <motion.div 
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group flex flex-col items-center text-center"
                >
                  {/* Photo & overlay */}
                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-3xl mb-6 bg-muted shadow-sm group-hover:shadow-xl group-hover:shadow-brand/10 transition-shadow duration-300">
                    {member.image && (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                    )}

                    {/* Overlay d'interaction au survol */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center gap-3">
                      {member.mail && (
                        <motion.a 
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          href={`mailto:${member.mail}`} 
                          className="p-3.5 bg-white text-brand rounded-full shadow-lg hover:bg-brand hover:text-white transition-colors duration-200"
                          aria-label="Email"
                        >
                          <Mail size={18} />
                        </motion.a>
                      )}
                      {member.linkedin && (
                        <motion.a 
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          href={member.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-3.5 bg-white text-brand rounded-full shadow-lg hover:bg-brand hover:text-white transition-colors duration-200"
                          aria-label="LinkedIn"
                        >
                          <LinkedinIcon size={18} />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Informations texte */}
                  <div className="flex items-center flex-col text-center px-2">
                    <h4 className="text-xl font-heading font-bold text-foreground group-hover:text-brand transition-colors duration-300">
                      {member.name}
                    </h4>
                    <p className="text-brand font-semibold text-sm mb-2">
                      {roleTranslated}
                    </p>
                    {descriptionTranslated && (
                      <p className="text-muted-foreground text-xs md:text-sm leading-relaxed line-clamp-3">
                        {descriptionTranslated}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

      </div>
    </section>
  );
}