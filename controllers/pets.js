const autoBind = require('auto-bind')

class PetsController {
  constructor () {
    autoBind(this)
  }

  async create (req, res) {
    return res.status(200).send()
  }
}

module.exports = new PetsController()
