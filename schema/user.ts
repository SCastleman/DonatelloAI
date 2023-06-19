import gql from "graphql-tag"

const typeDefs = gql`
    type Query {
        currentUser: User!
    }

    type User {
        id: ID!
        email: string
        job: string
        username: string
    }
`
export default typeDefs
