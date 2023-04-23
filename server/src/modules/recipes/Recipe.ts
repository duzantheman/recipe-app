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
`

export enum MeasuringUnit {
  // VOLUME
  TEASPOON = 'TEASPOON',
  TABLESPOON = 'TABLESPOON',
  FLUID_OUNCE = 'FLUID_OUNCE',
  CUP = 'CUP',
  PINT = 'PINT',
  QUART = 'QUART',
  GALLON = 'GALLON',
  MILLILITER = 'MILLILITER',
  LITER = 'LITER',
  DECILITER = 'DECILITER',

  // MASS
  POUND = 'POUND',
  OUNCE = 'OUNCE',
  MILLIGRAM = 'MILLIGRAM',
  GRAM = 'GRAM',
  KILOGRAM = 'KILOGRAM',
}

export type Ingredient = {
  amount?: number
  unit?: MeasuringUnit
  description?: string
  item: string
}

export type NutritionFacts = {
  calories: number
  protein: number
  carbohydrates: number
  fats: number
}

export type RecipeEntry = {
  id: string
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

export default {
  typeDefs,
  resolvers: {
    Recipe,
  },
}
