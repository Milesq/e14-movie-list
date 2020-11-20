const { gql } = require('apollo-server')

const input = gql`
  input MovieInput {
    title: String!
    genre: String!
    rating: Int!
    year: Int!
  }
`

const resolver = () => {
  return {
    title: 'Hello World',
  }
}

module.exports = { input, resolver }
