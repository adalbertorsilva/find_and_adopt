const jwt = require('jsonwebtoken')
const autoBind = require('auto-bind')
const {null_token_error: NullTokenError,
  invalid_token_error: InvalidTokenError} = require('../errors')

class AuthenticationMiddleware {
  constructor () {
    autoBind(this)
  }

  authenticate (token) {
    if (token === null) {
      throw new NullTokenError()
    }

    return this.decodeToken(token)
  }

  decodeToken (token) {
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (error) {
      throw new InvalidTokenError()
    }
  }
}

module.exports = new AuthenticationMiddleware()
