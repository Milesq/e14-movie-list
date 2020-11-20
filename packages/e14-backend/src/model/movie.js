const { Schema, model } = require('mongoose')

const Movie = new Schema({
  title: { type: String, unique: true },
  genre: String,
  productionYear: { type: Number, min: 1900 },
  rating: { type: Number, min: 1, max: 5 },
})

module.exports = model('movie', Movie)
