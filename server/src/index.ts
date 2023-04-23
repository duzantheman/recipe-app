import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { v4 as uuid } from 'uuid'

import { recipes } from './data.js'
import { AddRecipeInput, RecipeEntry } from './types.js'

const typeDefs = `#graphql
  # TODO: do we just want to store one for of each and convert it as part of the saving process?
  enum MeasuringUnit {
    # -- VOLUME
    TEASPOON
    TABLESPOON
    FLUID_OUNCE
    CUP
    PINT
    QUART
    GALLON
    MILLILITER
    LITER
    DECILITER
    # -- MASS
    POUND
    OUNCE
    MILLIGRAM
    GRAM
    KILOGRAM
  }

  type Ingredient {
    amount: Float
    unit: MeasuringUnit
    description: String
    item: String!
  }

  # TODO: add more details later (sugar, type of fat, micros, etc)
  type NutritionFacts {
    calories: Int!
    protein: Int!
    carbohydrates: Int!
    fats: Int!
  }

  type Recipe {
    id: ID!
    title: String!
    source: String
    servings: Int
    prepTime: Int # time in minutes
    cookTime: Int # time in minutes
    ingredients: [Ingredient!]!
    prepSteps: [String]
    cookSteps: [String!]!
    nutritionFacts: NutritionFacts
    notes: String
    favorite: Boolean
    tags: [String]
    image: String
  }

  type Query {
    recipes: [Recipe]
    recipe(id: ID!): Recipe
  }

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

const Recipe = {
  id: ({ id }: RecipeEntry) => id,
  title: ({ title }: RecipeEntry) => title,
  source: ({ source }: RecipeEntry) => source,
  servings: ({ servings }: RecipeEntry) => servings,
  prepTime: ({ prepTime }: RecipeEntry) => prepTime,
  cookTime: ({ cookTime }: RecipeEntry) => cookTime,
  ingredients: ({ ingredients }: RecipeEntry) => ingredients,
  prepSteps: ({ prepSteps }: RecipeEntry) => prepSteps,
  cookSteps: ({ cookSteps }: RecipeEntry) => cookSteps,
  nutritionFacts: ({ nutritionFacts }: RecipeEntry) => nutritionFacts,
  notes: ({ notes }: RecipeEntry) => notes,
  favorite: ({ favorite }: RecipeEntry) => favorite,
  tags: ({ tags }: RecipeEntry) => tags,
  image: ({ image }: RecipeEntry) => image,
}

const recipesList = (
  _parent: unknown,
  _args: unknown,
  { db }: Context,
): RecipeEntry[] => db.recipes
const recipeById = (
  _parent: unknown,
  args: { id: string },
  { db }: Context,
): RecipeEntry | undefined => db.recipes.find((recipe) => recipe.id === args.id)

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

const resolvers = {
  Recipe,
  Query: {
    recipes: recipesList,
    recipe: recipeById,
  },
  Mutation: {
    addRecipe,
  },
}

type Context = {
  db: {
    recipes: RecipeEntry[]
  }
}

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => ({
    // fake loading of the DB using hardcoded data
    db: await Promise.resolve({ recipes }),
  }),
})

console.debug(`🚀  Server ready at: ${url}`)
