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

type Ingredient = {
  amount?: number
  unit?: MeasuringUnit
  description?: string
  item: string
}

type NutritionFacts = {
  calories: number
  protein: number
  carbohydrates: number
  fats: number
}

export type AddRecipeInput = {
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
