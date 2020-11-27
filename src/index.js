import { GraphQLServer } from 'graphql-yoga'

// Type definitions (application schema)
const typeDefs = `
     type Query {
         hello: String!
         name: String!
     }
`

// Resolvers for the API
const resolvers = {
    Query: {
        hello() {
            return 'This is my first query!'
        },
        name() {
            return 'Salvatore Vivolo'
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
}) 

server.start(() => {
    console.log('The server is up on port 4000!')
})