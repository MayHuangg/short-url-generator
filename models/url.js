const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Url = new Schema({
  url: {
    type: String,
    required: true
  },
  fiveCharacters: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('UrlSchema', Url)
