import Recipe from './Recipe.js'
import addRecipe from './addRecipe.js'
import recipeById from './recipeById.js'
import recipesList from './recipesList.js'

export default {
  typeDefs: [
    // Types
    Recipe.typeDefs,

    // Queries
    recipesList.typeDefs,
    recipeById.typeDefs,

    // Mutations
    addRecipe.typeDefs,
  ],
  resolvers: [
    // Types
    Recipe.resolvers,

    // Queries
    recipesList.resolvers,
    recipeById.resolvers,

    // Mutations
    addRecipe.resolvers,
  ],
}
