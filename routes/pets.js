const { authentication: authenticationMiddleware, 'payload-validator': validatorMiddleware, animal_recognition_middleware: animalRecognitionMiddleware } = require('../middlewares')
const { pets: petsController } = require('../controllers')

module.exports = (app) => {
  app.post('/pets', authenticationMiddleware.validateAuthentication, validatorMiddleware.validatePetPayload, animalRecognitionMiddleware.valdateAnimal, petsController.create)
  app.get('/pets', authenticationMiddleware.validateAuthentication, validatorMiddleware.validateSearchPayload, petsController.search)
  app.get('/pets/:id', authenticationMiddleware.validateAuthentication, petsController.find)
}
