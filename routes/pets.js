const { authentication: authenticationMiddleware, 'payload-validator': validatorMiddleware } = require('../middlewares')
const { pets: petsController } = require('../controllers')

module.exports = (app) => {
  app.post('/pets', authenticationMiddleware.validateAuthentication, validatorMiddleware.validatePetPayload, petsController.create)
  app.get('/pets', authenticationMiddleware.validateAuthentication, validatorMiddleware.validateSearchPayload, petsController.search)
  app.get('/pets/:id', authenticationMiddleware.validateAuthentication, petsController.find)
}
