const mongoose = require('mongoose');
const validator = require('validator');

// описание схемы карточки
const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    validate: {
      validator: (v) => validator.isURL(
        v,
        {
          protocols: ['http', 'https'],
          require_protocol: true,
        },
      ),
      message: () => 'Некоректный URL',
    },
  },
  trailerLink: {
    type: String,
    require: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
    },
  },
  thumbnail: {
    type: String,
    require: true,
    validate: {
      validator: (v) => validator.isURL(
        v,
        {
          protocols: ['http', 'https'],
          require_protocol: true,
        },
      ),
      message: () => 'Некоректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },
  movieId: {
    type: Number,
    require: true,
  },
  nameRU: {
    type: String,
    require: true,
  },
  nameEN: {
    type: String,
    require: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
