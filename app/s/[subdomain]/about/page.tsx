import { Journey } from "@/components/About/Journey";
import { getEntityData } from "@/lib/getEntityData";
import Image from "next/image";

export default async function AboutPage({ params }: { params: Promise<{ subdomain: string }> }) {
  const { subdomain } = await params;
  const data = await getEntityData(subdomain);

  return (
    <>
      <main >
        <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
  
                {/* Texte à gauche */}
                <div className="lg:w-1/2 space-y-8">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-widest">
                    Notre Engagement
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground leading-[1.1]">
                    {data?.tagline || `Bâtir l'avenir avec ${data?.nom}`}
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 pt-4">
                    {/* Section Mission */}
                    <div className="border-l-2 border-brand pl-6">
                        <h4 className="font-bold text-foreground uppercase text-xs tracking-wider">Notre Mission</h4>
                        <p className="text-sm text-muted-foreground mt-2">
                        {data?.mission}
                        </p>
                    </div>

                    </div>
                </div>

                {/* Visuel à droite */}
                <div className="lg:w-1/2 relative">
                    {data?.typeEntite === 'social' ? (
                        <div className="grid grid-cols-2 gap-4">
                            <Image 
                                src="/social1.jpg" 
                                className="rounded-2xl aspect-square object-cover mt-12" 
                                width={800} 
                                height={600}
                                alt="Collaboration" 
                            />
                            <Image 
                                src="/social2.jpg" 
                                className="rounded-2xl aspect-square object-cover" 
                                width={800} 
                                height={600}
                                alt="Bureau" 
                            />
                        </div>
                    ) : data?.typeEntite === 'business' ? (
                            <div className="grid grid-cols-2 gap-4">
                                <Image 
                                    src="/business1.jpg" 
                                    className="rounded-2xl aspect-square object-cover mt-12" 
                                    width={800} 
                                    height={600}
                                    alt="Collaboration" 
                                />
                                <Image 
                                    src="/business2.jpg" 
                                    className="rounded-2xl aspect-square object-cover" 
                                    width={800} 
                                    height={600}
                                    alt="Bureau" 
                                />
                            </div>
                        ) : data?.typeEntite === 'cooperative' ? (
                            <div className="grid grid-cols-2 gap-4">
                                <Image 
                                    src="/cooperative1.jpg" 
                                    className="rounded-2xl aspect-square object-cover mt-12" 
                                    width={800} 
                                    height={600}
                                    alt="Collaboration" 
                                />
                                <Image 
                                    src="/cooperative2.jpg" 
                                    className="rounded-2xl aspect-square object-cover" 
                                    width={800} 
                                    height={600}
                                    alt="Bureau" 
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <Image 
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800" 
                                    className="rounded-2xl aspect-square object-cover mt-12" 
                                    width={800} 
                                    height={600}
                                    alt="Collaboration" 
                                />
                                <Image 
                                    src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800" 
                                    className="rounded-2xl aspect-square object-cover" 
                                    width={800} 
                                    height={600}
                                    alt="Bureau" 
                                />
                            </div>
                        )
                        
                    }

                    {/* Décoration : Un cercle flou aux couleurs de la marque */}
                    <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand/10 rounded-full blur-3xl"></div>
                </div>
                </div>
            </div>
        </section>
        <div className="">
            <Journey data={data} />
        </div>
      </main>
    </>
  );
}