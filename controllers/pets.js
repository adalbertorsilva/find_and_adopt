const autoBind = require('auto-bind')
const moment = require('moment')
const { Pet } = require('../models')
const awsClient = require('../clients/aws_client')

class PetsController {
  constructor () {
    autoBind(this)
  }

  async createPayload (requestBody) {
    return {
      location: {type: 'Point', coordinates: requestBody.location},
      photo: await awsClient.uploadImage(requestBody),
      description: requestBody.description,
      created_at: moment().toDate()
    }
  }

  async create (req, res) {
    const payload = await this.createPayload(req.body)
    const pet = await Pet.create(payload)
    return res.status(201).send(pet)
  }

  async search (req, res) {
    const pets = await Pet.searchAnimals(req.body.searchAttributes)
    return res.status(200).send(pets)
  }

  async find (req, res) {
    const pet = await Pet.findById(req.query.id)
    res.status(200).send(pet)
  }
}

module.exports = new PetsController()
