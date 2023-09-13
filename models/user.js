const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Заполните поле name'],
    minlength: [2, 'Имя пользователя не может быть короче 2 символов'],
    maxlength: [30, 'Имя пользователя не может быть длиннее 30 символов'],
  },
  email: {
    type: String,
    required: [true, 'Заполните поле email'],
    unique: true,
    // validate: {
    //   validator: (v) => (
    //     validator.isEmail(v)
    //   ),
    //   message: 'Введите корректный адрес почты',
    // },
    validate: {
      validator(v) {
        validator.isEmail(v);
      },
      message: 'Введите корректный адрес почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Заполните поле пароль'],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
