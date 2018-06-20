const { Pet } = require('../models')

module.exports = async () => {
  await Pet.destroy({where: {}})
}
