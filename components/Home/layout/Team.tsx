import { Mail} from "lucide-react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface Member {
  name: string;
  role: string;
  description: string;
  image: string;
  linkedin: string;
  mail: string;
}

async function getTeamMembers() {
  // On récupère les nouveaux champs : tagline, description et iconName
  const query = `*[_type == "membre"] {
    name,
    role,
    description,
    "image": image.asset->url,
    linkedin,
    mail
  }`;
  const data = await client.fetch(query);
  return data;
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

export function LinkedinIcon({ size = 20, className = "" }: { size?: number, className?: string }) {
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

export default async function Team() {
  const teamMembers = await getTeamMembers(); // Récupère les membres depuis Sanity
  return (
    <section id="team" className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-brand uppercase tracking-[0.2em] mb-4">
            Gouvernance
          </h2>
          <h3 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground mb-6">
            Notre Equipe
          </h3>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Une expertise pluridisciplinaire unie pour piloter notre croissance et maximiser notre impact global.
          </p>
        </div>

        {/* Grille des membres */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {teamMembers.map((member: Member, index: number) => (
            <div key={index} className="group flex flex-col">
              {/* Photo avec effet au survol */}
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl mb-6 bg-muted">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay social au survol */}
                <div className="absolute inset-0 bg-brand/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a href={member.mail} className="p-3 bg-white rounded-full text-brand hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </a>
                  <a href={member.linkedin} className="p-3 bg-white rounded-full text-brand hover:scale-110 transition-transform">
                    <LinkedinIcon size={20} />
                  </a>
                </div>
              </div>

              {/* Infos */}
              <div className="flex items-center flex-col text-center">
                 <h4 className="text-xl font-heading font-bold text-foreground">
                    {member.name}
                </h4>
                <p className="text-brand font-bold text-sm mb-3">
                    {member.role}
                </p>
                {/* <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.description}
                </p> */}
              </div>
             
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}