process.env.OMDB_KEY = 'abc'
const { default: mockingoose } = require('mockingoose')
const { gql } = require('apollo-server')
const { createTestClient } = require('apollo-server-testing')
const server = require('../src/server')
const Movie = require('../src/model/movie')
jest.mock('lodash.shuffle')

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
  let query
  beforeEach(() => {
    query = createTestClient(server).query
    mockingoose(Movie).toReturn(content)
  })

  afterEach(mockingoose.resetAll)

  it('works', async () => {
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

    it('random works', async () => {
      const moviesQuery = gql`
        query {
          movie(order: RANDOM) {
            title
          }
        }
      `

      const {
        data: { movie },
      } = await query({ query: moviesQuery })

      expect(movie[0].title).toBe('RANDOMIZED')
    })
  })

  describe('where `field`', () => {
    it('is equal', async () => {
      const moviesQuery = gql`
        query {
          movie(where: { year: { equal: 2002 } }) {
            title
          }
        }
      `

      const {
        data: { movie },
      } = await query({ query: moviesQuery })

      expect(movie.length).toBe(1)
      expect(movie[0].title).toBe('Revenge of the Sith')
    })

    it('is greater than', async () => {
      const moviesQuery = gql`
        query {
          movie(where: { year: { gt: 2005 } }) {
            title
          }
        }
      `

      const {
        data: { movie },
      } = await query({ query: moviesQuery })

      expect(movie.map(({ title }) => title)).toEqual([
        'Phantom Meance',
        'Attack of the Clone',
      ])
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
