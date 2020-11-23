process.env.OMDB_KEY = 'abc'
const { default: mockingoose } = require('mockingoose')
const { gql } = require('apollo-server')
const { createTestClient } = require('apollo-server-testing')
const server = require('../src/server')
const Movie = require('../src/model/movie')

const content = [
  {
    title: 'Phantom Meance',
    genre: 'Sci-Fi',
  },
  {
    title: 'Attack of the Clone',
    genre: 'Adventure',
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
        genre {
          title
          movies {
            title
          }
        }
      }
    `

    const res = await query({ query: moviesQuery })

    const template = [
      {
        title: 'Sci-Fi',
        movies: [
          {
            title: 'Phantom Meance',
          },
        ],
      },
      {
        title: 'Adventure',
        movies: [
          {
            title: 'Attack of the Clone',
          },
        ],
      },
    ]

    expect(res.data.genre).toEqual(template)
  })
})
