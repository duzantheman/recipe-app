import { MeasuringUnit, RecipeEntry } from './types.js'

// -- Hardcoded DB data
export const recipes: RecipeEntry[] = [
  {
    id: 'abee8c0a-6c58-4d19-8ea3-32d62de3daf9',
    title: 'Mexican Chicken and Corn Street Tacos',
    source: 'Fed & Fit',
    servings: 4,
    prepTime: 5,
    cookTime: 14,
    ingredients: [
      {
        amount: 1,
        unit: MeasuringUnit.CUP,
        description: 'sliced',
        item: 'kale',
      },
      {
        item: 'chipotle lime dressing',
      },
      {
        amount: 2,
        unit: MeasuringUnit.TABLESPOON,
        item: 'salted butter',
      },
    ],
    prepSteps: [
      'Prep the kale',
      'Make the chipotle lime dressing',
      // [
      //   'Blend all ingredients in a bowl',
      // ],
    ],
    cookSteps: [
      'Make the slaw',
      'Make the chicken filling',
      'Cook the chicken until slightly brown',
    ],
    // nutritionFacts: NutritionFacts,
    notes: 'Fed & Fit - pg 132',
    favorite: true,
    tags: ['chicken', 'mexican'],
  },
]
