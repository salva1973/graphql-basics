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
    id: '10',
    title: 'GraphQL 101',
    body: 'Best course ever',
    published: true,
    author: '1'
}, {
    id :'11',
    title: 'SwiftUI 101',
    body: 'To be completed',
    published: false,
    author: '1'
},
{
    id :'12',
    title: 'MongoDB 101',
    body: 'To be completed',
    published: false,
    author: '2'
}]

// Demo comments data
const comments = [{
    id: '100',
    text: 'Fantastic course!',
    author: '1',
    post: '10'
}, {
    id :'101',
    text: 'Terrific course!',
    author: '1',
    post: '10'
}, {
    id :'102',
    text: 'Very good introduction!',
    author: '2',
    post: '11'
}, {
    id :'103',
    text: 'Not so good...',
    author: '3',
    post: '12'
}

]

// Type definitions (application schema)
const typeDefs = `
     type Query {
         users(query: String): [User!]!
         posts(query: String): [Post!]!
         comments(query: String): [Comment!]!
         me: User!
         post: Post!
     }

     type User {
         id: ID!
         name: String!
         email: String!
         age: Int
         posts: [Post!]!
         comments: [Comment!]!
     }

     type Post {
         id: ID!
         title: String!
         body: String!
         published: Boolean!
         author: User!
         comments: [Comment!]!
     }

     type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
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
        comments(parent, args, ctx, info) {
            if (!args.query) {
                return comments
            }

            return comments.filter((comment) => {
                const isTextMatch = comment.text.toLowerCase().includes(args.query.toLowerCase())
                return isTextMatch
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
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            }) 
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
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