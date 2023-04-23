import { recipes } from '../data.js'

import { RecipeEntry } from './recipes/Recipe.js'

export type Context = {
  db: {
    recipes: RecipeEntry[]
  }
}

export const getContext = async (): Promise<Context> =>
  await Promise.resolve({
    db: {
      // fake loading of the DB using hardcoded data
      recipes,
    },
  })
