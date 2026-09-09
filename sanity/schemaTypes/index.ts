import { type SchemaTypeDefinition } from 'sanity'
import { membreType } from './membres'
import { entrepriseType } from './entreprises'
import { projetType } from './projets'
import { localeString } from './objects/localString'
import { localeText } from './objects/localText'
import { localeBlockContent } from './objects/localeBlockContent'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    membreType, 
    entrepriseType, 
    projetType,

    localeString,
    localeText,
    localeBlockContent,
  ],
}
