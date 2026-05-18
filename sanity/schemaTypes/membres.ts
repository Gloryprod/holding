import { UsersIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const membreType = defineType({
  name: 'membre',
  title: 'Équipe Globale',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nom & Prénom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rôle Principal',
      type: 'string',
      description: 'Ex: Directeur Technique, Responsable Opérations...',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo de profil',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Biographie courte',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'linkedin',
      title: 'Lien LinkedIn',
      type: 'url',
    }),
    defineField({
      name: 'mail',
      title: 'Adresse Email',
      type: 'url',
    }),
  ],
})