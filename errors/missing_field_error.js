
class MissingFieldError extends Error {
  constructor () {
    super()
    this.status = 400
  }
}

module.exports = MissingFieldError
