import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Demo users data
const users = [{
    id: '1',
    name: 'Salva',
    email: 'salva@example.com',
    age: 47
}, {
    id :'2',
    name: 'Sarah',
    email: 'salah@example.com'
},
{
    id :'3',
    name: 'Mike',
    email: 'mike@example.com'
}]

// Demo posts data
const posts = [{
    id: '1',
    title: 'GraphQL 101',
    body: 'Best course ever',
    published: true
}, {
    id :'2',
    title: 'SwiftUI 101',
    body: 'To be completed',
    published: false
},
{
    id :'3',
    title: 'MongoDB 101',
    body: 'To be completed',
    published: false
}]

// Type definitions (application schema)
const typeDefs = `
     type Query {
         users(query: String): [User!]!
         posts(query: String): [Post!]!
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
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
            
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }
            
            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch                
            })

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