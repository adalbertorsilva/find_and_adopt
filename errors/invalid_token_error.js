class InvalidTokenError extends Error {
  constructor () {
    super()
    this.status = 401
    this.message = 'Invalid token !'
  }
}

module.exports = InvalidTokenError
