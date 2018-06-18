class NullTokenError extends Error {
  constructor () {
    super()
    this.status = 401
    this.message = 'Token can not be null'
  }
}

module.exports = NullTokenError
