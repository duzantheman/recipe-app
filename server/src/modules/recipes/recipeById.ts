import { Context } from '../context.js'

import { RecipeEntry } from './Recipe.js'

const typeDefs = `#graphql
  type Query {
    recipe(id: ID!): Recipe
  }
`

const recipeById = (
  _parent: unknown,
  args: { id: string },
  { db }: Context,
): RecipeEntry | undefined => db.recipes.find((recipe) => recipe.id === args.id)

export default {
  typeDefs,
  resolvers: {
    Query: {
      recipe: recipeById,
    },
  },
}
