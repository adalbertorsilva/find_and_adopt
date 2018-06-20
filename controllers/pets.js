const autoBind = require('auto-bind')
const moment = require('moment')
const { Pet } = require('../models')
const imageUploadController = require('../controllers/image_upload')

class PetsController {
  constructor () {
    autoBind(this)
  }

  async createPayload (requestBody) {
    return {
      location: {type: 'Point', coordinates: requestBody.location},
      photo: await imageUploadController.uploadImage(requestBody),
      description: requestBody.description,
      created_at: moment().toDate()
    }
  }

  async create (req, res) {
    const payload = await this.createPayload(req.body)
    const pet = await Pet.create(payload)
    return res.status(200).send(pet)
  }

  async search (req, res) {
    const location = {
      longitude: req.query.long,
      latitude: req.query.lat
    }
    const pets = await Pet.findNotifiedAreas(location, req.query.radius)
    res.status(200).send(pets)
  }
}

module.exports = new PetsController()
