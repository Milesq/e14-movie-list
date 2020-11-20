require('dotenv').config()
const mongoose = require('mongoose')
const server = require('./server')

/**
 * @param {String} err
 */
function throwError(err) {
  throw new Error(err)
}

mongoose
  .connect(process.env.MONGOURL || throwError('MONGOURL is not defined'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    server.listen().then(({ port }) => {
      console.log(`🚀 Server is listening on ${port}`)
    })
  })
