const autoBind = require('auto-bind')
const { validate } = require('joi')
const { pet: petSchema, search: searchSchema } = require('../schemas')
const respondError = require('../utils/respondError')

class PayloadValidatorMiddleware {
  constructor () {
    autoBind(this)
  }

  validatePetPayload (req, res, next) {
    try {
      validate(req.body, petSchema)
      next()
    } catch (error) {
      respondError(res, error)
    }
  }

  validateSearchPayload (req, res, next) {
    try {
      const searchAttributes = {
        longitude: req.query.long,
        latitude: req.query.lat,
        radius: req.query.radius
      }

      validate(searchAttributes, searchSchema)
      req.body.searchAttributes = searchAttributes
      next()
    } catch (error) {
      respondError(res, error)
    }
  }
}

module.exports = new PayloadValidatorMiddleware()
