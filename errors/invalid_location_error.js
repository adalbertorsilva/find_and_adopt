const autoBind = require('auto-bind')

class InvalidLocationError extends Error {
  constructor () {
    super()
    autoBind(this)
    this.status = 422
    this.message = 'The attribute location must have 2 elements'
  }
}

module.exports = InvalidLocationError
