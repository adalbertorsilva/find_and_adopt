const autoBind = require('auto-bind')
const moment = require('moment')
const { Pet } = require('../models')

class PetsController {
  constructor () {
    autoBind(this)
  }

  async create (req, res) {
    const payload = req.body
    payload.created_at = moment().toDate()
    payload.location = {type: 'Point', coordinates: req.body.location}
    const pet = await Pet.create(payload)
    return res.status(200).send(pet)
  }
}

module.exports = new PetsController()
