class DogNotFoundError {
  constructor () {
    this.status = 403
    this.message = 'There is no dog on the image'
  }
}

module.exports = DogNotFoundError
