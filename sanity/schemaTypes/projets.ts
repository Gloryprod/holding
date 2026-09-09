import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const projetType = defineType({
  name: 'projet',
  title: 'Projets / Réalisations',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre du projet',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { 
        source: (doc: any) => doc?.titre?.fr || doc?.titre?.en || '',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'entreprise',
      title: 'Entreprise porteuse',
      type: 'reference',
      to: [{ type: 'entreprise' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imagePrincipale',
      title: 'Image de couverture',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'statut',
      title: 'État d’avancement',
      type: 'string',
      options: {
        list: [
          { title: 'En cours', value: 'en-cours' },
          { title: 'Terminé', value: 'termine' },
          { title: 'En levée de fonds', value: 'levee-de-fonds' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description détaillée',
      type: 'localeBlockContent', // Version multilingue pour du contenu enrichi (PortableText)
    }),
  ],
  preview: {
    select: {
      titleFr: 'titre.fr',
      titleEn: 'titre.en',
      entreprise: 'entreprise.nom.fr',
      media: 'imagePrincipale',
    },
    prepare({ titleFr, titleEn, entreprise, media }) {
      return {
        title: titleFr || titleEn || 'Projet sans titre',
        subtitle: entreprise ? `Entreprise: ${entreprise}` : '',
        media,
      }
    },
  },
})