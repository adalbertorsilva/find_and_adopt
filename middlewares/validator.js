const autoBind = require('auto-bind')
const { validate } = require('joi')

class ValidatorMiddleware {
  constructor () {
    autoBind(this)
  }

  validatePet (req, res, next) {
    try {
      validate(req.body)
      next()
    } catch (error) {
      this.respondError(res, error)
    }
  }

  respondError (res, error) {
    return res.status(error.status).send({message: error.message})
  }
}

module.exports = new ValidatorMiddleware()
