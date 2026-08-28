import { defineType } from 'sanity'

export const localeString = defineType({
  title: 'Chambre de texte multilingue',
  name: 'localeString',
  type: 'object',
  fields: [
    {
      title: 'Français',
      name: 'fr',
      type: 'string',
    },
    {
      title: 'Anglais',
      name: 'en',
      type: 'string',
    },
  ],
})