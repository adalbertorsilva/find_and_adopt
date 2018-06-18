const jwt = require('jsonwebtoken')
require('dotenv').config()

class TokenHelper {
  getNullToken () {
    return null
  }

  getInvalidToken () {
    return jwt.sign({}, 'awrongpassword')
  }

  getToken () {
    return jwt.sign({}, process.env.TOKEN_SECRET)
  }
}

module.exports = new TokenHelper()
