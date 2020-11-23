const { gql } = require('apollo-server')
const shuffle = require('lodash.shuffle')
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
    RATING
    YEAR
  }

  enum Direction {
    ASC
    DESC
    RANDOM
  }
`

const resolver = async (parent, { limit, sortBy, order = 'ASC' }) => {
  let movies = await Movie.find()
  const orderFn = {
    ASC: (a, b) => a > b,
    DESC: (a, b) => a < b,
  }

  if (sortBy) {
    movies.sort((first, second) => {
      const a = first[sortBy.toLocaleLowerCase()].toString().toLocaleLowerCase()
      const b = second[sortBy.toLocaleLowerCase()]
        .toString()
        .toLocaleLowerCase()

      if (orderFn[order === 'ASC' ? 'DESC' : 'ASC'](a, b)) return -1
      if (orderFn[order](a, b)) return 1
      return 0
    })
  }

  if (order === 'RANDOM') {
    movies = shuffle(movies)
  }

  if (limit) {
    return movies.slice(0, limit)
  }

  return movies
}

module.exports = { schema, resolver }
