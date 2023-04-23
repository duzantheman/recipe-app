import { Context } from '../context.js'

import { RecipeEntry } from './Recipe.js'

const typeDefs = `#graphql
  type Query {
    recipes: [Recipe]
  }
`

const recipesList = (
  _parent: unknown,
  _args: unknown,
  { db }: Context,
): RecipeEntry[] => db.recipes

export default {
  typeDefs,
  resolvers: {
    Query: {
      recipes: recipesList,
    },
  },
}
