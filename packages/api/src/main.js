require('dotenv').config()
const mongoose = require('mongoose')
const server = require('./server')
const throwError = require('./utils/throwError')

mongoose
  .connect(process.env.MONGOURL || throwError('MONGOURL is not defined'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    server
      .listen({
        port: process.env.PORT || 4000,
      })
      .then(({ port }) => {
        console.log(`🚀 Server is listening on ${port}`)
      })
  })
