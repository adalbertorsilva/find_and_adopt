const sandbox = require('sinon').createSandbox()
const AWS = require('aws-sdk')
const rekognition = new AWS.Rekognition()
const Bluebird = require('bluebird')
const {aws_client: awsClient} = require('../../clients')
const {animal_recognition_middleware: animalRecognitionMiddleware} = require('../../middlewares')
const rekognitionResultHelper = require('../helper/rekognition_result_helper')
Bluebird.promisifyAll(rekognition)

afterEach(() => {
  sandbox.restore()
})

describe('ANIMAL RECOGNITION MIDDLEWARE UNIT TEST', () => {
  describe('When the image does not have a dog on it', () => {
    it('Should throw an DogNotFoundError', async () => {
      sandbox.stub(awsClient, 'analizeImage').returns(rekognitionResultHelper.getLabelsWithoutADog())
      const payload = {photo: 'some not dog image'}
      let middlewareError
      try {
        await animalRecognitionMiddleware.validateImage(payload)
      } catch (error) {
        middlewareError = error
      }

      expect(middlewareError).toHaveProperty('message', 'There is no dog on the image')
    })
  })

  describe('When the image does not have hte minimum confidence to be accepted', () => {
    it('Should throw an DogNotFoundError', async () => {
      sandbox.stub(awsClient, 'analizeImage').returns(rekognitionResultHelper.getDogLabelsWithoutWithoutMinimumPercentageOfConfidence())
      const payload = {photo: 'some not dog image'}
      let middlewareError
      try {
        await animalRecognitionMiddleware.validateImage(payload)
      } catch (error) {
        middlewareError = error
      }

      expect(middlewareError).toHaveProperty('message', 'We are not sure if a dog is present on the image, could you take a better picture ?')
    })
  })
})
