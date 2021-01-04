const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Author = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
})

module.exports = mongoose.model('Author', Author)
