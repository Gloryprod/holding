import { ArrowRight, Calendar, Tag } from "lucide-react";

const projects = [
  {
    title: "Construction d'un centre de santé rural",
    entity: "ONG",
    date: "Mars 2026",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
    category: "Social",
    color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30",
  },
  {
    title: "Optimisation de la chaîne logistique export",
    entity: "SARL 1",
    date: "Février 2026",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
    category: "Industrie",
    color: "text-brand bg-brand/10",
  },
  {
    title: "Lancement de la campagne agricole durable",
    entity: "Coopérative",
    date: "Janvier 2026",
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=800&auto=format&fit=crop",
    category: "Agriculture",
    color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30",
  },
];

export default function RecentProjects() {
  return (
    <section id="news" className="py-12 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* En-tête avec bouton "Tout voir" */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-3">
              Actualités
            </h2>
            <h3 className="text-4xl font-heading font-extrabold text-foreground">
              Projets Récents & Impact
            </h3>
          </div>
          <a href="#" className="inline-flex items-center gap-2 text-brand font-bold hover:gap-3 transition-all">
            Voir tous les projets <ArrowRight size={20} />
          </a>
        </div>

        {/* Grille de projets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <article key={index} className="group bg-background rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300">
              
              {/* Image avec Badge Entité */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${project.color}`}>
                    {project.entity}
                  </span>
                </div>
              </div>

              {/* Contenu de la carte */}
              <div className="p-8">
                <div className="flex items-center gap-4 text-muted-foreground text-xs mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} /> {project.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Tag size={14} /> {project.category}
                  </span>
                </div>

                <h4 className="text-xl font-heading font-bold text-foreground mb-4 group-hover:text-brand transition-colors line-clamp-2">
                  {project.title}
                </h4>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                  Découvrez comment cette initiative s&apos;inscrit dans la vision globale de Obed Group pour le développement durable...
                </p>

                <button className="text-sm font-bold flex items-center gap-2 group/btn">
                  Lire la suite 
                  <div className="w-8 h-0.5 bg-brand/30 group-hover/btn:w-12 transition-all duration-300"></div>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}