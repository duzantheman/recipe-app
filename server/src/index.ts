import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { recipes } from './data.js'
import { RecipeEntry } from './types.js'

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

const recipesList = (): RecipeEntry[] => recipes
const recipeById = (
  _parent: unknown,
  args: { id: string },
): RecipeEntry | undefined => recipes.find((recipe) => recipe.id === args.id)

const resolvers = {
  Recipe,
  Query: {
    recipes: recipesList,
    recipe: recipeById,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const start = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })

  console.debug(`🚀  Server ready at: ${url}`)
}

start()
