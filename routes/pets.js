const { authentication: AuthenticationMiddleware } = require('../middlewares')
const { pets: petsController } = require('../controllers')

module.exports = (app) => {
  app.post('/pets', AuthenticationMiddleware.validateAuthentication, petsController.create)
}