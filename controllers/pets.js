const autoBind = require('auto-bind')
const moment = require('moment')
const Joi = require('joi')
const { Pet } = require('../models')
const imageUploadController = require('../controllers/image_upload')
const { missing_field_error: MissinFieldError } = require('../errors')
const { pet: petSchema } = require('../schemas')

class PetsController {
  constructor () {
    autoBind(this)
  }

  isNullOrEmpty (attribute) {
    return attribute === null || attribute === undefined
  }

  async createPayload (requestBody) {
    if (this.isNullOrEmpty(requestBody.location) || this.isNullOrEmpty(requestBody.photo)) {
      throw new MissinFieldError()
    }

    return {
      location: {type: 'Point', coordinates: requestBody.location},
      photo: await imageUploadController.uploadImage(requestBody),
      description: requestBody.description,
      created_at: moment().toDate()
    }
  }

  async create (req, res) {
    try {
      console.log('SCHEMA -------------> ', Joi.validate(req.body, petSchema))
      const payload = await this.createPayload(req.body)
      const pet = await Pet.create(payload)
      return res.status(200).send(pet)
    } catch (error) {
      return res.status(error.status).send(error.message)
    }
  }

  async search (req, res) {
    const location = {
      longitude: req.query.long,
      latitude: req.query.lat
    }
    const pets = await Pet.findNotifiedAreas(location, req.query.radius)
    res.status(200).send(pets)
  }

  async find (req, res) {
    const pet = await Pet.findById(req.query.id)
    res.status(200).send(pet)
  }
}

module.exports = new PetsController()
