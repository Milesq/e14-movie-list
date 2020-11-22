const { gql } = require('apollo-server')
const { schema: Movie, resolver: movie } = require('./queries/movie')
const {
  input: MovieInput,
  resolver: createMovie,
} = require('./mutations/createMovie')

const schema = gql`
  ${Movie}
  ${MovieInput}

  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    movie: [Movie!]
  }

  type Mutation {
    createMovie(input: MovieInput!): Movie!
  }
`

const resolvers = {
  Query: {
    movie,
  },
  Mutation: {
    createMovie,
  },
}

module.exports = {
  resolvers,
  schema,
}
