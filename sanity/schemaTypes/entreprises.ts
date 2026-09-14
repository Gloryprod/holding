// import { CaseIcon } from '@sanity/icons'
// import { defineArrayMember, defineField, defineType } from 'sanity'

// export const entrepriseType = defineType({
//   name: 'entreprise',
//   title: 'Entreprises du Groupe',
//   type: 'document',
//   icon: CaseIcon,
//   fields: [
//     defineField({
//       name: 'nom',
//       title: 'Nom de l’entreprise ou de la filiale',
//       type: 'localeString',
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: 'tagline',
//       title: 'Slogan / Phrase d’accroche',
//       type: 'localeString',
//       description: 'Ex: L’union des forces pour une économie solidaire',
//     }),
//     defineField({
//       name: 'slug',
//       title: 'Lien URL (Slug)',
//       type: 'slug',
//       options: { source: 'nom' },
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: 'iconName',
//       title: 'Icône de l’entité (Lucide)',
//       type: 'localeString',
//       description: 'Le nom de l’icône Lucide à afficher (ex: Sprout, Heart, Factory).',
//     }),
//     defineField({
//       name: 'logo',
//       title: 'Logo officiel',
//       type: 'image',
//       options: { hotspot: true },
//     }),
//     defineField({
//       name: 'imageCover',
//       title: 'Image de couverture',
//       type: 'image',
//       options: { hotspot: true },
//     }),
//     defineField({
//       name: 'description',
//       title: 'Description détaillée',
//       type: 'localeText',
//       description: 'Le texte complet présentant l’organisation.',
//     }),
//     defineField({
//       name: 'mission',
//       title: 'Mission & Vision (Résumé)',
//       type: 'localeText',
//       description: 'Une version courte pour les survols ou les résumés.',
//     }),
//     defineField({
//       name: 'services',
//       title: 'Nos Services / Offres',
//       type: 'array',
//       of: [
//         defineArrayMember({
//           type: 'object',
//           fields: [
//             { name: 'titre', type: 'localeString', title: 'Nom du service' },
//             { name: 'description', type: 'localeText', title: 'Description du service' },
//           ],
//         }),
//       ],
//     }),
//     defineField({
//       name: 'facebook',
//       title: 'Lien Facebook',
//       type: 'url',
//     }),

//     defineField({
//       name: 'linkedin',
//       title: 'Lien LinkedIn',
//       type: 'url',
//     }),
//     defineField({
//       name: 'siteWeb',
//       title: 'Site Web',
//       type: 'url',
//     }),
//     defineField({
//       name: 'telephone',
//       title: 'Numéro de téléphone',
//       type: 'string',
//     }),
//     defineField({
//       name: 'email',
//       title: 'Adresse e-mail',
//       type: 'string',
//       validation: (Rule) => Rule.email(),
//     }),
//     defineField({
//       name: 'adresse',
//       title: 'Adresse',
//       type: 'string',
//     }),
//     defineField({
//       name: 'typeEntite',
//       title: 'Type d\'Entité',
//       type: 'string',
//       options: {
//         list: [
//           { title: 'Business / SARL', value: 'business' },
//           { title: 'Social / ONG', value: 'social' },
//           { title: 'Coopérative', value: 'cooperative' },
//         ],
//       },
//     }),
//     defineField({
//       name: 'seo',
//       title: 'Référencement (SEO)',
//       type: 'object',
//       fields: [
//         {
//           name: 'metaTitle',
//           title: 'Titre Meta',
//           type: 'localeString',
//           description: 'Le titre affiché dans les onglets du navigateur et Google (60-70 caractères).'
//         },
//         {
//           name: 'metaDescription',
//           title: 'Description Meta',
//           type: 'localeText',
//           description: 'Le résumé affiché dans les résultats Google (150-160 caractères).'
//         },
//         {
//           name: 'ogImage',
//           title: 'Image de partage (Open Graph)',
//           type: 'image',
//           description: 'L\'image qui s\'affiche lors du partage sur WhatsApp, Facebook, LinkedIn.'
//         }
//       ],
//     }),
//   ],
// })

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
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Slogan / Phrase d’accroche',
      type: 'localeString',
      description: 'Ex: L’union des forces pour une économie solidaire',
    }),
    defineField({
      name: 'slug',
      title: 'Lien URL (Slug)',
      type: 'slug',
      options: { 
        source: (doc: any) => doc?.nom?.fr || doc?.nom?.en || '',
      },
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
      type: 'localeText',
      description: 'Le texte complet présentant l’organisation.',
    }),
    defineField({
      name: 'mission',
      title: 'Mission & Vision (Résumé)',
      type: 'localeText',
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
            defineField({ name: 'titre', type: 'localeString', title: 'Nom du service' }),
            defineField({ name: 'description', type: 'localeText', title: 'Description du service' }),
          ],
          preview: {
            select: {
              titleFr: 'titre.fr',
              titleEn: 'titre.en',
              descFr: 'description.fr',
              descEn: 'description.en',
            },
            prepare({ titleFr, titleEn, descFr, descEn }) {
              return {
                title: titleFr || titleEn || 'Service sans titre',
                subtitle: descFr || descEn || '',
              }
            },
          },
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
    }),
    defineField({
      name: 'nombre_projets',
      title: 'Nombre de projets',
      type: 'number',
    }),
    defineField({
      name: 'nombre_beneficiaires',
      title: 'Nombre de bénéficiaires',
      type: 'number',
    }),
    defineField({
      name: 'nombre_annees_experience',
      title: 'Nombre d\'années d\'expérience',
      type: 'number',
    }),
    defineField({
      name: 'nombre_partenaires',
      title: 'Nombre de partenaires',
      type: 'number',
    }),
    defineField({
      name: 'seo',
      title: 'Référencement (SEO)',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Titre Meta',
          type: 'localeString',
          description: 'Le titre affiché dans les onglets du navigateur et Google (60-70 caractères).'
        }),
        defineField({
          name: 'metaDescription',
          title: 'Description Meta',
          type: 'localeText',
          description: 'Le résumé affiché dans les résultats Google (150-160 caractères).'
        }),
        defineField({
          name: 'ogImage',
          title: 'Image de partage (Open Graph)',
          type: 'image',
          options: { hotspot: true },
          description: 'L\'image qui s\'affiche lors du partage sur WhatsApp, Facebook, LinkedIn.'
        })
      ],
    }),
  ],

  preview: {
    select: {
      nomFr: 'nom.fr',
      nomEn: 'nom.en',
      taglineFr: 'tagline.fr',
      taglineEn: 'tagline.en',
      logo: 'logo',
    },
    prepare({ nomFr, nomEn, taglineFr, taglineEn, logo }) {
      return {
        title: nomFr || nomEn || 'Entreprise sans nom',
        subtitle: taglineFr || taglineEn || '',
        media: logo,
      }
    },
  },
})