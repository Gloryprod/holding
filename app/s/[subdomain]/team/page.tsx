'use client';

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Mail, Search, Users, Sparkles, ArrowRight, X, ExternalLink, Briefcase } from "lucide-react";

import { client } from "@/sanity/lib/client";
import { useLanguage } from "@/context/LanguageContext";
import { getLocale } from "@/lib/getLocal";

type LocalizedString = string | { fr?: string; en?: string };

interface Member {
  _id?: string;
  name: string;
  role: LocalizedString;
  description?: LocalizedString;
  image: string;
  linkedin?: string;
  mail?: string;
}

// Icône LinkedIn personnalisée
function LinkedinIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
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

// Framer Motion Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TeamPage() {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const [teamMembers, setTeamMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalMember, setActiveModalMember] = useState<Member | null>(null);

  // Récupération des membres depuis Sanity
  useEffect(() => {
    async function fetchTeam() {
      try {
        const query = `*[_type == "membre"] {
          _id,
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
        console.error("Erreur lors de la récupération de l'équipe :", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTeam();
  }, []);

    // Filtrage et tri dynamique (CEO & Co-founder en premier)
    const filteredMembers = useMemo(() => {
    // 1. Filtrage selon la recherche
    const list = teamMembers.filter((member) => {
        const roleText = getLocale(member.role, language).toLowerCase();
        const descText = getLocale(member.description, language).toLowerCase();
        const nameText = member.name.toLowerCase();
        const query = searchQuery.toLowerCase().trim();

        return (
        nameText.includes(query) ||
        roleText.includes(query) ||
        descText.includes(query)
        );
    });

    // 2. Tri personnalisé : mettre le Co-founder / CEO tout en haut
    return list.sort((a, b) => {
        const roleA = getLocale(a.role, language).toLowerCase();
        const roleB = getLocale(b.role, language).toLowerCase();

        const isCeoA = roleA.includes("ceo") ;
        const isCeoB = roleB.includes("ceo");

        if (isCeoA && !isCeoB) return -1; // 'a' passe avant 'b'
        if (!isCeoA && isCeoB) return 1;  // 'b' passe avant 'a'
        return 0;                         // conserve l'ordre pour les autres
    });
    }, [teamMembers, searchQuery, language]);

  return (
    <main className="min-h-screen bg-background relative pt-28 pb-20 overflow-hidden font-inter">
      {/* Halo lumineux d'arrière-plan */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-brand/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* ================= HERO SECTION ================= */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-brand/10 text-brand text-xs font-black uppercase tracking-[0.2em] shadow-xs"
          >
            <Users size={14} />
            {isFr ? "Notre Capital Humain" : "Our Human Capital"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-foreground tracking-tight mb-6 leading-[1.15]"
          >
            {isFr ? "Les visages derrière " : "The faces behind "}
            <span className="text-brand">{isFr ? "notre vision." : "our vision."}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg sm:text-xl leading-relaxed"
          >
            {isFr
              ? "Une équipe multidisciplinaire de passionnés, d'experts et d'innovateurs unis pour façonner l'écosystème de demain."
              : "A multidisciplinary team of enthusiasts, experts, and innovators united to shape tomorrow's ecosystem."}
          </motion.p>
        </section>

        {/* ================= BARRE DE RECHERCHE ================= */}
        <section className="mb-12 flex justify-center">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isFr ? "Rechercher par nom ou rôle..." : "Search by name or role..."}
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-muted/30 border border-border/60 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-muted-foreground/70"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 cursor-pointer"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </section>

        {/* ================= GRILLE DES MEMBRES ================= */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse flex flex-col items-center">
                <div className="w-full aspect-4/5 bg-muted/60 rounded-3xl mb-4" />
                <div className="h-5 w-3/4 bg-muted/60 rounded mb-2" />
                <div className="h-4 w-1/2 bg-muted/60 rounded" />
              </div>
            ))}
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-center py-16 bg-muted/20 border border-border/40 rounded-3xl">
            <p className="text-muted-foreground font-medium text-lg">
              {isFr ? "Aucun membre ne correspond à votre recherche." : "No team member matches your search."}
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {filteredMembers.map((member, index) => {
              const roleTranslated = getLocale(member.role, language);
              const descriptionTranslated = getLocale(member.description, language);

              return (
                <motion.div
                  key={member._id || index}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  onClick={() => setActiveModalMember(member)}
                  className="group cursor-pointer flex flex-col bg-background border border-border/60 rounded-[2rem] p-4 shadow-sm hover:shadow-2xl hover:shadow-brand/10 transition-all duration-300"
                >
                  {/* Photo & Actions rapides */}
                  <div className="relative w-full aspect-4/5 overflow-hidden rounded-[1.5rem] mb-5 bg-muted">
                    {member.image && (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}

                    {/* Social Actions */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {member.mail && (
                        <a
                          href={`mailto:${member.mail}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2.5 bg-background/90 text-brand rounded-full hover:bg-brand hover:text-brand-foreground shadow-md transition-colors"
                        >
                          <Mail size={16} />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2.5 bg-background/90 text-brand rounded-full hover:bg-brand hover:text-brand-foreground shadow-md transition-colors"
                        >
                          <LinkedinIcon size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Informations Textes */}
                  <div className="flex flex-col flex-1 px-2 pb-2">
                    <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-brand transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-brand font-semibold text-xs uppercase tracking-wider mb-2">
                      {roleTranslated}
                    </p>
                    {descriptionTranslated && (
                      <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed mb-4">
                        {descriptionTranslated}
                      </p>
                    )}

                    <div className="mt-auto pt-2 border-t border-border/40 flex items-center text-xs font-bold text-brand gap-1 group-hover:translate-x-1 transition-transform">
                      <span>{isFr ? "Voir la bio" : "View bio"}</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* ================= MODALE BIOGRAPHIE DETAILLEE ================= */}
        <AnimatePresence>
          {activeModalMember && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModalMember(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-background border border-border w-full max-w-2xl rounded-[2.5rem] p-6 sm:p-8 shadow-2xl z-10 overflow-hidden max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setActiveModalMember(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-muted/60 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="relative w-full sm:w-48 aspect-4/5 rounded-2xl overflow-hidden bg-muted shrink-0">
                    {activeModalMember.image && (
                      <Image
                        src={activeModalMember.image}
                        alt={activeModalMember.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-heading font-black text-foreground">
                        {activeModalMember.name}
                      </h3>
                      <p className="text-brand font-bold text-sm">
                        {getLocale(activeModalMember.role, language)}
                      </p>
                    </div>

                    {activeModalMember.description ? (
                      <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                        {getLocale(activeModalMember.bio, language)}
                      </p>
                    ) : (
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {getLocale(activeModalMember.description, language)}
                      </p>
                    )}

                    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                      {activeModalMember.mail && (
                        <a
                          href={`mailto:${activeModalMember.mail}`}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand/10 text-brand text-xs font-bold hover:bg-brand hover:text-brand-foreground transition-colors"
                        >
                          <Mail size={14} />
                          <span>Email</span>
                        </a>
                      )}
                      {activeModalMember.linkedin && (
                        <a
                          href={activeModalMember.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted text-foreground text-xs font-bold hover:bg-brand hover:text-brand-foreground transition-colors"
                        >
                          <LinkedinIcon size={14} />
                          <span>LinkedIn</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ================= RECRUTEMENT / CTA SECTION ================= */}
        <section className="mt-24 p-8 sm:p-12 rounded-[2.5rem] bg-linear-to-br from-brand/10 via-background to-background border border-brand/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} />
              {isFr ? "Rejoignez l'Aventure" : "Join the Adventure"}
            </div>
            <h2 className="text-3xl font-heading font-black text-foreground">
              {isFr ? "Vous souhaitez faire évoluer votre carrière ?" : "Want to elevate your career?"}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              {isFr
                ? "Nous sommes constamment à la recherche de nouveaux talents passionnés. Découvrez nos opportunités ou envoyez-nous une candidature spontanée."
                : "We are always on the lookout for new passionate talents. Explore our opportunities or send us a spontaneous application."}
            </p>
          </div>

          <Link href="/contact" className="shrink-0">
            <button className="flex items-center gap-3 px-8 py-4 bg-brand text-brand-foreground font-bold rounded-2xl shadow-lg shadow-brand/20 hover:scale-105 active:scale-95 transition-all cursor-pointer">
              <Briefcase size={18} />
              <span>{isFr ? "Postuler maintenant" : "Apply Now"}</span>
            </button>
          </Link>
        </section>

      </div>
    </main>
  );
}