import { defineType } from 'sanity'

export const localeBlockContent = defineType({
  name: 'localeBlockContent',
  title: 'Contenu enrichi multilingue',
  type: 'object',
  fields: [
    {
      name: 'fr',
      title: 'Français',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'en',
      title: 'Anglais',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    },
  ],
})