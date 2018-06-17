const {null_token_error: NullTokenError} = require('../errors')

class AuthenticationMiddleware {
  authenticate (token) {
    if (token === null) {
      throw new NullTokenError()
    }
  }
}

module.exports = new AuthenticationMiddleware()
