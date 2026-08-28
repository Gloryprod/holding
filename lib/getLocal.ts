export function getLocale(
  field: { fr?: string; en?: string } | string | undefined,
  lang: 'fr' | 'en' = 'fr'
): string {
  if (!field) return ''
  if (typeof field === 'string') return field // Sécurité si la donnée est un texte simple
  return field[lang] || field.fr || ''
}