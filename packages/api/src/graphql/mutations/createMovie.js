const { gql, UserInputError } = require('apollo-server')
const { default: ow } = require('ow')
const Movie = require('../../model/movie')

const input = gql`
  input MovieInput {
    title: String!
    genre: String!
    rating: Int!
    year: Int!
  }
`

async function resolver(parent, args) {
  const rules = ow.object.exactShape({
    title: ow.string.minLength(1),
    genre: ow.string,
    rating: ow.number.inRange(1, 5).integer,
    year: ow.number.greaterThanOrEqual(1900),
  })

  try {
    ow(args.input, rules)
  } catch (err) {
    throw new UserInputError(err.message)
  }

  try {
    await new Movie(args.input).save()
  } catch (err) {
    if (err.code !== 11000) throw err

    throw new UserInputError(
      'In our database exists the movie with the same title'
    )
  }

  return args.input
}

module.exports = { input, resolver }
