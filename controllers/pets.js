const autoBind = require('auto-bind')
const moment = require('moment')
const {validate} = require('joi')
const { Pet } = require('../models')
const imageUploadController = require('../controllers/image_upload')
const { pet: petSchema, search: searchSchema } = require('../schemas')

class PetsController {
  constructor () {
    autoBind(this)
  }

  async createPayload (requestBody) {
    validate(requestBody, petSchema)
    return {
      location: {type: 'Point', coordinates: requestBody.location},
      photo: await imageUploadController.uploadImage(requestBody),
      description: requestBody.description,
      created_at: moment().toDate()
    }
  }

  respondError (res, error) {
    return res.status(error.status).send({message: error.message})
  }

  async create (req, res) {
    try {
      const payload = await this.createPayload(req.body)
      const pet = await Pet.create(payload)
      return res.status(200).send(pet)
    } catch (error) {
      return this.respondError(res, error)
    }
  }

  async search (req, res) {
    try {
      const searchAttributes = {
        longitude: req.query.long,
        latitude: req.query.lat,
        radius: req.query.radius
      }
      validate(searchAttributes, searchSchema)
      const pets = await Pet.searchAnimals(searchAttributes)
      return res.status(200).send(pets)
    } catch (error) {
      return this.respondError(res, error)
    }
  }

  async find (req, res) {
    const pet = await Pet.findById(req.query.id)
    res.status(200).send(pet)
  }
}

module.exports = new PetsController()
