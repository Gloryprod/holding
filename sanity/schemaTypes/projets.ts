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
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titre' },
      validation: (Rule) => Rule.required(),
    }),
    // LA RÉFÉRENCE : Le lien vers l'entreprise
    defineField({
      name: 'entreprise',
      title: 'Entreprise porteuse',
      type: 'reference',
      to: [{ type: 'entreprise' }], // On lie ce projet au schéma 'entreprise'
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
        layout: 'radio', // Affiche des boutons radio pour Obed
      },
    }),
    defineField({
      name: 'description',
      title: 'Description détaillée',
      type: 'array',
      of: [{ type: 'block' }], // Permet de mettre du gras, des listes, etc.
    }),
  ],
}) 