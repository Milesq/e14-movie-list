const { gql } = require('apollo-server')
const Movie = require('../../model/movie')

const schema = gql`
  type Movie {
    title: String!
    genre: String!
    rating: Int!
    year: Int!
  }

  enum MovieField {
    TITLE
    GENRE
    YEAR
  }
`

const resolver = () => Movie.find()

module.exports = { schema, resolver }
