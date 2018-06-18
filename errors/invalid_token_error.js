class InvalidTokenError extends Error {
  constructor () {
    super()
    this.message = 'Invalid token !'
  }
}

module.exports = InvalidTokenError
