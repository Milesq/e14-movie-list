const { gql } = require('apollo-server')
const { schema: Movie, resolver: movie } = require('./movie')

const schema = gql`
  ${Movie}

  type Query {
    movie: [Movie!]
  }
`

const resolvers = {
  Query: {
    movie,
  },
}

module.exports = {
  resolvers,
  schema,
}
