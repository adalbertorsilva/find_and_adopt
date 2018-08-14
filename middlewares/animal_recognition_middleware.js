const autoBind = require('auto-bind')
const {aws_client: awsClient} = require('../clients')
const {dog_not_found_error: DogNotFoundError,
  insuficient_confidence_error: InsuficientConfidenceError} = require('../errors')
require('dotenv').config()

class AnimalRecognitionMiddleware {
  constructor () {
    autoBind(this)
  }

  async valdateAnimal (req, res, next) {
    try {
      await this.validateImage(req.body)
      next()
    } catch (error) {
      res.status(error.status).send({message: error.message})
    }
  }

  async validateImage (payload) {
    const analizeResult = await awsClient.analizeImage(payload)
    const dogLabel = analizeResult.Labels.find(label => label.Name === 'Dog')

    if (dogLabel === undefined) {
      throw new DogNotFoundError()
    }

    if (dogLabel.Confidence < parseFloat(process.env.MINIMUM_CONFIDENCE_PERCENTAGE)) {
      throw new InsuficientConfidenceError()
    }
  }
}

module.exports = new AnimalRecognitionMiddleware()
