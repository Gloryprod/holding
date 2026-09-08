import { useState } from 'react';
import { DocumentActionProps, useDocumentOperation } from 'sanity';
import { Sparkles } from 'lucide-react';

export function TranslateAction(props: DocumentActionProps) {
  const { patch } = useDocumentOperation(props.id, props.type);
  const [isTranslating, setIsTranslating] = useState(false);

  return {
    label: isTranslating ? 'Traduction en cours...' : 'Traduire en EN (DeepL)',
    icon: Sparkles,
    disabled: isTranslating,
    onHandle: async () => {
      setIsTranslating(true);
      try {
        const doc = props.draft || props.published;
        if (!doc) return;

        const fieldsToTranslate: { path: string; text: string; isLegacyString?: boolean }[] = [];

        // Scan des champs avec rétrocompatibilité des anciennes valeurs string
        const scanFields = (obj: any, prefix = '') => {
          if (!obj || typeof obj !== 'object') return;

          Object.keys(obj).forEach((key) => {
            // Ignorer les champs système de Sanity
            if (key.startsWith('_')) return;

            const currentPath = prefix ? `${prefix}.${key}` : key;
            const field = obj[key];

            if (typeof field === 'string' && field.trim().length > 0) {
              // CAS 1 : C'est une ancienne string simple (Invalid property value)
              // On la considère comme la version française à migrer vers localeString
              fieldsToTranslate.push({
                path: currentPath,
                text: field.trim(),
                isLegacyString: true,
              });
            } else if (field && typeof field === 'object' && !Array.isArray(field)) {
              // CAS 2 : C'est déjà un objet localeString { fr: "...", en: "..." }
              const hasFr = typeof field.fr === 'string' && field.fr.trim().length > 0;
              const isEnEmpty = !field.en || (typeof field.en === 'string' && field.en.trim() === '');

              if (hasFr && isEnEmpty) {
                fieldsToTranslate.push({
                  path: `${currentPath}.en`,
                  text: field.fr.trim(),
                  isLegacyString: false,
                });
              } else {
                scanFields(field, currentPath);
              }
            } else if (Array.isArray(field)) {
              // Parcours des tableaux d'objets (ex: services, hero sections)
              field.forEach((item, index) => {
                if (item && typeof item === 'object') {
                  const itemKey = item._key ? `_key=="${item._key}"` : index;
                  scanFields(item, `${currentPath}[${itemKey}]`);
                }
              });
            }
          });
        };

        scanFields(doc);

        if (fieldsToTranslate.length === 0) {
          alert('Aucun champ en français à traduire.');
          setIsTranslating(false);
          return;
        }

        // Envoi des textes à traduire à notre API DeepL
        const response = await fetch('/api/sanity-translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: fieldsToTranslate.map((f) => f.text) }),
        });

        if (!response.ok) {
          throw new Error(`Erreur serveur HTTP : ${response.status}`);
        }

        const data = await response.json();

        if (data.translations && Array.isArray(data.translations)) {
          const setPatches: Record<string, any> = {};

          fieldsToTranslate.forEach((field, index) => {
            const translatedText = data.translations[index];
            const cleanPath = field.path.replace(/\.+/g, '.').replace(/\.$/, '');

            if (translatedText && cleanPath) {
              if (field.isLegacyString) {
                // Si c'était une ancienne chaîne, on remplace par un objet localeString complet
                setPatches[cleanPath] = {
                  _type: 'localeString',
                  fr: field.text,
                  en: translatedText,
                };
              } else {
                // Si c'était déjà un objet localeString, on patch seulement le champ .en
                setPatches[cleanPath] = translatedText;
              }
            }
          });

          // Application des corrections et traductions dans Sanity
          if (Object.keys(setPatches).length > 0) {
            patch.execute([{ set: setPatches }]);
          }
        }
      } catch (err) {
        console.error('Erreur traduction Sanity :', err);
        alert('Erreur lors de la traduction.');
      } finally {
        setIsTranslating(false);
      }
    },
  };
}