const { gql } = require('apollo-server')
const { schema: Movie, resolver: movie } = require('./queries/movie')
const { schema: Genre, resolver: genre } = require('./queries/genre')
const {
  input: MovieInput,
  resolver: createMovie,
} = require('./mutations/createMovie')

const schema = gql`
  ${Genre}
  ${Movie}
  ${MovieInput}

  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    movie(limit: Int, sortBy: MovieField): [Movie!]
    genre: [Genre!]!
  }

  type Mutation {
    createMovie(input: MovieInput!): Movie!
  }
`

const resolvers = {
  Query: {
    movie,
    genre,
  },
  Mutation: {
    createMovie,
  },
}

module.exports = {
  resolvers,
  schema,
}
