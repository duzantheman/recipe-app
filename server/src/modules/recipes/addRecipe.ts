import { v4 as uuid } from 'uuid'

import { Context } from '../context.js'

import { Ingredient, NutritionFacts } from './Recipe.js'

const typeDefs = `#graphql
  input IngredientInput {
    amount: Float
    unit: MeasuringUnit
    description: String
    item: String!
  }

  input NutritionFactsInput {
    calories: Int!
    protein: Int!
    carbohydrates: Int!
    fats: Int!
  }

  input AddRecipeInput {
    title: String!,
    source: String,
    servings: Int,
    prepTime: Int,
    cookTime: Int,
    ingredients: [IngredientInput!]!,
    prepSteps: [String],
    cookSteps: [String!]!,
    nutritionFacts: NutritionFactsInput,
    notes: String,
    favorite: Boolean,
    tags: [String],
  }

  type Mutation {
    addRecipe(input: AddRecipeInput!): Recipe!
  }
`

type AddRecipeInput = {
  title: string
  source?: string
  servings?: number
  prepTime?: number
  cookTime?: number
  ingredients: Ingredient[]
  prepSteps: string[]
  cookSteps: string[]
  nutritionFacts?: NutritionFacts
  notes?: string
  favorite?: boolean
  tags: string[]
  image?: string
}

const addRecipe = (
  _parent: unknown,
  { input: recipe }: { input: AddRecipeInput },
  { db }: Context,
) => {
  const newRecipe = {
    ...recipe,
    id: uuid(),
  }

  db.recipes.push(newRecipe)

  return newRecipe
}

export default {
  typeDefs,
  resolvers: {
    Mutation: {
      addRecipe,
    },
  },
}
