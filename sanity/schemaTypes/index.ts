import { type SchemaTypeDefinition } from 'sanity'
import { membreType } from './membres'
import { entrepriseType } from './entreprises'
import { projetType } from './projets'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [membreType, entrepriseType, projetType],
}
