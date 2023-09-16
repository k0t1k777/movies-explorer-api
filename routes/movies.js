const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const httpValidator = require('../utils/constans');

const {
  createMovie,
  getMovie,
  deleteMovie,
} = require('../controllers/movies');

// # создаёт фильм с данными в теле
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.string().required().min(4).max(30),
    description: Joi.string().required().min(2).max(1000),
    image: Joi.string().required().pattern(httpValidator),
    trailerLink: Joi.string().required().pattern(httpValidator),
    thumbnail: Joi.string().required().pattern(httpValidator),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
  }),
}), createMovie);

// # возвращает все сохранённые текущим пользователем фильмы
router.get('/', getMovie);

// # удаляет сохранённый фильм по id
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = router;
