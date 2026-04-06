import { CaseIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const entrepriseType = defineType({
  name: 'entreprise',
  title: 'Entreprises du Groupe',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom de l’entreprise',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Lien URL (Slug)',
      type: 'slug',
      options: { source: 'nom' }, // Génère le lien à partir du nom
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo de l’entreprise',
      type: 'image',
    }),
    defineField({
      name: 'mission',
      title: 'Mission & Vision',
      type: 'text',
      description: 'Expliquez ce que fait cette entreprise en quelques phrases.',
    }),
    // SECTION SERVICES (C'est ici que ça devient un "mini-site")
    defineField({
      name: 'services',
      title: 'Nos Services / Offres',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'titre', type: 'string', title: 'Nom du service' },
            { name: 'description', type: 'text', title: 'Description détaillée' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'facebook',
      title: 'Lien Facebook',
      type: 'url',
    }),
  ],
})