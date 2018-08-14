class InsuficientConfidenceError {
  constructor () {
    this.status = 422
    this.message = 'We are not sure if a dog is present on the image, could you take a better picture ?'
  }
}

module.exports = InsuficientConfidenceError
