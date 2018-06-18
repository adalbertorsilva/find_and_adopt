const jwt = require('jsonwebtoken')
const autoBind = require('auto-bind')
const {null_token_error: NullTokenError,
  invalid_token_error: InvalidTokenError} = require('../errors')

class AuthenticationMiddleware {
  constructor () {
    autoBind(this)
  }

  validateAuthentication (req, res, next) {
    try {
      const token = req.get('Authorization')
      this.authenticate(token)
      next()
    } catch (error) {
      res.status(error.status).send({message: error.message})
    }
  }

  authenticate (token) {
    if (!token) {
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
