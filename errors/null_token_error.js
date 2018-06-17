class NullTokenError extends Error {
  constructor () {
    super()
    this.message = 'Token can not be null'
  }
}

module.exports = NullTokenError
