import { defineType } from 'sanity'

export const localeText = defineType({
  title: 'Texte long multilingue',
  name: 'localeText',
  type: 'object',
  fields: [
    {
      title: 'Français',
      name: 'fr',
      type: 'text',
      rows: 3,
    },
    {
      title: 'Anglais',
      name: 'en',
      type: 'text',
      rows: 3,
    },
  ],
})