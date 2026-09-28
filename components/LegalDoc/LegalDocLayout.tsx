"use client"
import React from "react";
import { useLanguage } from "@/context/LanguageContext"; 
import {
  COMPANIES,
  LEGAL_DOCS_CONTENT,
  LegalDocType,
} from "@/lib/legalDocsData";

interface LegalDocLayoutProps {
  docType: LegalDocType;
  companySlug?: string;
}

export const LegalDocLayout: React.FC<LegalDocLayoutProps> = ({
  docType,
  companySlug = "kodanu",
}) => {
  const { language } = useLanguage(); // 'fr' | 'en'
  const langKey = (language as "fr" | "en") || "fr";

  const company = COMPANIES[companySlug] || COMPANIES.kodanu;
  const doc = LEGAL_DOCS_CONTENT[docType];

  if (!doc) {
    return <div className="container py-12">Document non trouvé.</div>;
  }

  const title = doc.title[langKey];
  const sections = doc.getContent(company)[langKey];

  return (
    <div className="min-h-screen bg-background py-26 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* En-tête du Document */}
        <header className="border-b pb-6">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            {company.name}
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mt-1">
            {title}
          </h1>
        </header>

        {/* Contenu des Sections */}
        <main className="space-y-8 text-foreground/90 leading-relaxed">
          {sections.map((section, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                {section.heading}
              </h2>
              <div
                className="prose prose-neutral dark:prose-invert max-w-none whitespace-pre-line"
              >
                {section.content}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
};