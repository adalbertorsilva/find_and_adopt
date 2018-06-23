
class MissingFieldError extends Error {
  constructor (attribute) {
    super()
    this.status = 422
    this.message = `The attribute ${attribute} is required`
  }
}

module.exports = MissingFieldError
