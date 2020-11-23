const { gql } = require('apollo-server');
const Movie = require('../../model/movie');

const schema = gql`
  type Genre {
    title: String!
    movies: [Movie!]
  }
`

const resolver = async () => {
  const movies = await Movie.find()
  const genres = [...new Set(movies.map(({ genre }) => genre))]

  return genres.map(genre => ({
    title: genre,
    movies: movies.filter(movie => movie.genre === genre),
  }))
}

module.exports = { schema, resolver }
