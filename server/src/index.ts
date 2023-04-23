import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { Context, getContext } from './modules/context.js'
import modules from './modules/index.js'

const server = new ApolloServer<Context>(modules)

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: getContext,
})

console.debug(`🚀  Server ready at: ${url}`)
