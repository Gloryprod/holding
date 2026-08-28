import { useState } from 'react';
import { DocumentActionProps, useDocumentOperation } from 'sanity';
import { Sparkles } from 'lucide-react';

export function TranslateAction(props: DocumentActionProps) {
  const { patch } = useDocumentOperation(props.id, props.type);
  const [isTranslating, setIsTranslating] = useState(false);

  return {
    label: isTranslating ? 'Traduction DeepL en cours...' : 'Traduire en EN (DeepL)',
    icon: Sparkles,
    disabled: isTranslating,
    onHandle: async () => {
      setIsTranslating(true);
      try {
        const doc = props.draft || props.published;
        if (!doc) return;

        const fieldsToTranslate: { path: string; text: string }[] = [];

        // Recherche récursive des champs { fr, en }
        const scanFields = (obj: any, prefix = '') => {
            if (!obj || typeof obj !== 'object') return;

            Object.keys(obj).forEach((key) => {
                const currentPath = prefix ? `${prefix}.${key}` : key;
                const field = obj[key];

                if (field && typeof field === 'object') {
                // Détection d'un champ localeString ou localeText
                const hasFr = typeof field.fr === 'string' && field.fr.trim().length > 0;
                const isEnEmpty = !field.en || (typeof field.en === 'string' && field.en.trim() === '');

                if (hasFr && isEnEmpty) {
                    fieldsToTranslate.push({ path: `${currentPath}.en`, text: field.fr.trim() });
                } else {
                    // Scanner les sous-objets ou tableaux
                    scanFields(field, currentPath);
                }
                }
            });
        };

        scanFields(doc);

        if (fieldsToTranslate.length === 0) {
          alert('Aucun champ en français à traduire (ou l’anglais est déjà rempli).');
          setIsTranslating(false);
          return;
        }

        // Appel à notre route d'API Next.js
        const response = await fetch('/api/sanity-translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: fieldsToTranslate.map((f) => f.text) }),
        });

        const data = await response.json();

        if (data.translations) {
          // Injection des traductions directement dans le formulaire Sanity
          const setPatches: Record<string, string> = {};
          fieldsToTranslate.forEach((field, index) => {
            setPatches[field.path] = data.translations[index];
          });

          patch.execute([{ set: setPatches }]);
        }
      } catch (err) {
        console.error('Erreur lors de la traduction :', err);
        alert('Erreur lors de la traduction. Vérifie ta clé API DeepL.');
      } finally {
        setIsTranslating(false);
      }
    },
  };
}