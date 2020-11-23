const { default: mockingoose } = require('mockingoose')
const { gql } = require('apollo-server')
const { createTestClient } = require('apollo-server-testing')
const server = require('../src/server')
const Movie = require('../src/model/movie')

describe('List getting', () => {
  it('works', async () => {
    const content = [
      {
        title: 'Revenge of the Sith',
        genre: 'Sci-Fi',
        production: 2005,
        rating: 5,
      },
    ]

    mockingoose(Movie).toReturn(content)

    const { query } = createTestClient(server)

    const moviesQuery = gql`
      query {
        movie {
          title
        }
      }
    `

    const res = await query({ query: moviesQuery })

    expect(res.data.movie[0].title).toBe(content[0].title)
  })
})

describe('movies with parameters', () => {
  it('`limit` works', async () => {
    const content = [
      {
        title: 'Phantom Meance',
        genre: 'Sci-Fi',
        production: 1999,
        rating: 4,
      },
      {
        title: 'Attack of the Clone',
        genre: 'Sci-Fi',
        production: 2002,
        rating: 4,
      },
      {
        title: 'Revenge of the Sith',
        genre: 'Sci-Fi',
        production: 2005,
        rating: 5,
      },
    ]

    mockingoose(Movie).toReturn(content)

    const { query } = createTestClient(server)

    const moviesQuery = gql`
      query {
        movie(limit: 2) {
          title
        }
      }
    `

    const res = await query({ query: moviesQuery })

    expect(res.data.movie.length).toBe(2)
  })
})
