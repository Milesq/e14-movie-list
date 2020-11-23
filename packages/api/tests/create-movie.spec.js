process.env.OMDB_KEY = 'abc'
const { gql } = require('apollo-server')
const { createTestClient } = require('apollo-server-testing')
const Movie = require('../src/model/movie')
const server = require('../src/server')

describe('Saving system', () => {
  function createMovie(movie) {
    const { mutate } = createTestClient(server)

    const createMovie = gql`
      mutation($movie: MovieInput!) {
        createMovie(input: $movie) {
          title
        }
      }
    `

    return mutate({
      mutation: createMovie,
      variables: { movie },
    })
  }

  beforeEach(() => {
    Movie.prototype.save = jest.fn()
  })

  it('works', async () => {
    await createMovie({
      genre: 'Sci-Fi',
      year: 1999,
      title: 'Star Wars: The Phantom Menace',
      rating: 5,
    })

    expect(Movie.prototype.save).toBeCalled()
  })

  it('to reject old-age movies', async () => {
    createMovie({
      genre: 'Sci-Fi',
      year: 20,
      title: 'Star Wars: The Phantom Menace',
      rating: 5,
    })

    expect(Movie.prototype.save).not.toBeCalled()
  })

  it('to reject movies with rating non-matching to [1, 5]', async () => {
    await createMovie({
      genre: 'Sci-Fi',
      year: 1999,
      title: 'Star Wars: The Phantom Menace',
      rating: -1,
    })

    expect(Movie.prototype.save).not.toBeCalled()
  })

  it('to reject duplicated movies', async () => {
    await createMovie({
      genre: 'Sci-Fi',
      year: 1999,
      title: 'Star Wars: The Phantom Menace',
      rating: 5,
    })

    Movie.prototype.save = jest.fn(() => {
      throw { code: 11000 }
    })

    const newMovie = await createMovie({
      genre: 'Sci-Fi',
      year: 1999,
      title: 'Star Wars: The Phantom Menace',
      rating: 5,
    })

    expect(newMovie.data).toBeNull()
    expect(newMovie.errors).not.toBeNull()
  })
})
