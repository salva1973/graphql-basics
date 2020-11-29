import { GraphQLServer } from 'graphql-yoga'

// Type definitions (application schema)
const typeDefs = `
     type Query {
         greeting(name: String): String!
         me: User!
         post: Post!
     }

     type User {
         id: ID!
         name: String!
         email: String!
         age: Int
     }

     type Post {
         id: ID!
         title: String!
         body: String!
         published: Boolean!
     }
`

// Resolvers for the API
const resolvers = {
    Query: {
        greeting(parent, args, ctx, info) {
            if (args.name) {
                return `Hello, ${args.name}!`
            } else {
                return 'Hello!'
            }
        },
        me() {
            return {
                id: '390800',
                name: 'salva',
                email: 'user@domain.com',
                age: 47

            }
        },
        post() {
            return {
                id: '490800',
                title: 'GraphQL 101',
                body: 'Nice course',
                published: true
            }
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