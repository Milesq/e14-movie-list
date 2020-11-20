const { gql } = require('apollo-server')

const schema = gql`
  type Movie {
    title: String!
    genre: String!
    rating: Int!
    year: Int!
  }
`

const resolver = () => [
  {
    title: 'hello',
    genre: 'world',
    year: 2000,
    rating: 3,
  },
]

module.exports = { schema, resolver }
