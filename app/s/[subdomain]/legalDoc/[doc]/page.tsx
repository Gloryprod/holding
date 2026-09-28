import { LegalDocLayout } from "@/components/LegalDoc/LegalDocLayout";
import { LegalDocType } from "@/lib/legalDocsData";

export default async function LegalPage({ params }: { params: Promise<{ subdomain: string; doc: LegalDocType; }>  }) {
  const { subdomain, doc } = await params;

  return (
    <LegalDocLayout
      companySlug={subdomain}
      docType={doc}
    />
  );
}