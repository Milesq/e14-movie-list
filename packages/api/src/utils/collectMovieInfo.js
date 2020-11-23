const { default: axios } = require('axios')
const pick = require('lodash.pick')
const lowerCaseKeys = require('./lowerCaseKeys')
const throwError = require('./throwError')

const apikey = process.env.OMDB_KEY || throwError('OMDB is not defined')
const getApiURL = params => {
  const url = new URL(`http://www.omdbapi.com/?apikey=${apikey}`)

  params.forEach(([key, val]) => {
    url.searchParams.append(key, val)
  })

  return url.href
}

module.exports = async title => {
  const url = getApiURL([
    ['t', title],
    ['plot', 'full'],
  ])

  const { data } = await axios.get(url)
  if (data.Response !== 'True') return {}

  return lowerCaseKeys(pick(data, ['Plot', 'Poster', 'Awards']))
}
