import { type SchemaTypeDefinition } from 'sanity'
import banner from '../schemas/banner'
import product from '../schemas/product'
import category from '../schemas/category'

export const schema: { types: SchemaTypeDefinition[] } = {
  //Banner Products and Categories
  types: [banner, product, category],
}
