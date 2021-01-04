const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  favoriteGenre: {
    type: String,
  },
})

module.exports = mongoose.model('User', User)
