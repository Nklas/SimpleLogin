const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
  authenticate,
  create,
  authenticateUserById
};

async function authenticateUserById(id) {
  const token = jwt.sign({sub: id}, config.secret, {expiresIn: '7d'});
  return {Authorization: token};
}

async function authenticate({ email, login, password }) {
  // find user with email or login
  const searchedField = email ? 'email' : 'login';
  const searchedFieldValue = email ? email : login;
  const user = await db.User.scope('withHash').findOne({where: { [searchedField]: searchedFieldValue }});

  if (!user || !(await bcrypt.compare(password, user.hash))) {
    throw {
      statusCode: 422,
      field: 'password',
      message: 'Wrong email/login or password'
    }
  }

// authentication successful
  return authenticateUserById(user.id);
}

async function create(params) {
  // check if email is already present
  if (await db.User.findOne({where: {email: params.email}})) {
    throw {
      field: 'email',
      message: 'Email "' + params.email + '" is already taken'
    }
  }

  // check if login is already present
  if (await db.User.findOne({where: {login: params.login}})) {
    throw {
      field: 'login',
      message: 'Login "' + params.login + '" is already taken'
    }
  }

  // hash password
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  // save user
  return db.User.create(params);
}