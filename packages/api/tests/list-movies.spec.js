const { default: mockingoose } = require('mockingoose')
const { gql } = require('apollo-server')
const { createTestClient } = require('apollo-server-testing')
const server = require('../src/server')
const Movie = require('../src/model/movie')

const content = [
  {
    title: 'Phantom Meance',
    genre: 'Sci-Fi',
    year: 2008,
    rating: 2,
  },
  {
    title: 'Attack of the Clone',
    genre: 'Sci-Fi',
    year: 2012,
    rating: 3,
  },
  {
    title: 'Revenge of the Sith',
    genre: 'Sci-Fi',
    year: 2002,
    rating: 1,
  },
]

describe('List getting', () => {
  beforeEach(() => {
    mockingoose(Movie).toReturn(content)
  })

  afterEach(mockingoose.resetAll)

  it('works', async () => {
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

  describe('with parameters', () => {
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

    it('`sortBy` works', async () => {
      const { query } = createTestClient(server)

      const moviesQuery = gql`
        query {
          movie(sortBy: YEAR) {
            year
          }
        }
      `

      let {
        data: { movie },
      } = await query({ query: moviesQuery })
      movie = movie.map(pick('year'))

      expect(() => movie.reduce(createisMonotonicReducer())).not.toThrow('')
    })

    it('`sortBy` descending works', async () => {
      const { query } = createTestClient(server)

      const moviesQuery = gql`
        query {
          movie(sortBy: YEAR, order: DESC) {
            year
          }
        }
      `

      let {
        data: { movie },
      } = await query({ query: moviesQuery })
      movie = movie.map(pick('year'))

      expect(() => movie.reduce(createisMonotonicReducer(desc))).not.toThrow('')
    })
  })
})

const pick = key => obj => obj[key]
const asc = (a, b) => a > b
const desc = (a, b) => a < b
const createisMonotonicReducer = (monotonicTester = asc) => (acc, el) => {
  if (monotonicTester(acc, el)) throw ''
  else return el
}
