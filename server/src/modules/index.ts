import recipes from './recipes/index.js'

export default {
  typeDefs: [...recipes.typeDefs],
  resolvers: [...recipes.resolvers],
}
