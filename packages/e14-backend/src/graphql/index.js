const { gql } = require('apollo-server')

const schema = gql`
  type Query {
    my: String
  }
`

const resolvers = {
  Query: {
    my: () => 'Hello from GraphQL World!',
  },
}

module.exports = {
  resolvers,
  schema,
}
