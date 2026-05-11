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
      title: 'Nom de l’entreprise ou de la filiale',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Slogan / Phrase d’accroche',
      type: 'string',
      description: 'Ex: L’union des forces pour une économie solidaire',
    }),
    defineField({
      name: 'slug',
      title: 'Lien URL (Slug)',
      type: 'slug',
      options: { source: 'nom' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'Icône de l’entité (Lucide)',
      type: 'string',
      description: 'Le nom de l’icône Lucide à afficher (ex: Sprout, Heart, Factory).',
    }),
    defineField({
      name: 'logo',
      title: 'Logo officiel',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageCover',
      title: 'Image de couverture',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description détaillée',
      type: 'text',
      description: 'Le texte complet présentant l’organisation.',
    }),
    defineField({
      name: 'mission',
      title: 'Mission & Vision (Résumé)',
      type: 'text',
      description: 'Une version courte pour les survols ou les résumés.',
    }),
    defineField({
      name: 'services',
      title: 'Nos Services / Offres',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'titre', type: 'string', title: 'Nom du service' },
            { name: 'description', type: 'text', title: 'Description du service' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'facebook',
      title: 'Lien Facebook',
      type: 'url',
    }),

    defineField({
      name: 'linkedin',
      title: 'Lien LinkedIn',
      type: 'url',
    }),
    defineField({
      name: 'siteWeb',
      title: 'Site Web',
      type: 'url',
    }),
    defineField({
      name: 'telephone',
      title: 'Numéro de téléphone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Adresse e-mail',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'adresse',
      title: 'Adresse',
      type: 'string',
    }),
    defineField({
      name: 'typeEntite',
      title: 'Type d\'Entité',
      type: 'string',
      options: {
        list: [
          { title: 'Business / SARL', value: 'business' },
          { title: 'Social / ONG', value: 'social' },
          { title: 'Coopérative', value: 'cooperative' },
        ],
      },
    })
  ],
})