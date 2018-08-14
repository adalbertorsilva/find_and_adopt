const imagesHelper = require('../helper/image-converter-helper')
const awsClient = require('../../clients/aws_client')
const urlHelper = require('../helper/url-validator-helper')

describe('AWS CLIENT INTEGRATION TEST', () => {
  describe('When the payload is passed', () => {
    it('should return an image url', async () => {
      const payload = {
        photo: imagesHelper.getImage('tino'),
        location: [-23.589543, -46.607310]
      }
      const imageResponse = await awsClient.uploadImage(payload)
      expect(urlHelper.isUrl(imageResponse)).toBeTruthy()
    })
  })
})
