export function AboutHero() {
  return (
    <section className="relative py-24 bg-brand text-brand-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h1 className="text-sm font-bold uppercase tracking-[0.3em] mb-6 opacity-80">Notre Vision</h1>
        <p className="text-4xl md:text-6xl font-heading font-black leading-tight max-w-4xl">
          Devenir le catalyseur de référence alliant <span className="underline decoration-white/30">progrès social</span> et <span className="underline decoration-white/30">excellence entrepreneuriale</span> en Afrique.
        </p>
      </div>
      {/* Décoration abstraite en fond */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform translate-x-1/2" />
    </section>
  );
}