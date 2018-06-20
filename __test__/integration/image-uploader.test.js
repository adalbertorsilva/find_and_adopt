const imagesHelper = require('../helper/image-converter-helper')
const {image_upload: imageUploadController} = require('../../controllers')
const urlHelper = require('../helper/url-validator-helper')

describe('IMAGE UPLOAD', () => {
  describe('When the payload is passed', () => {
    it('should return an image url', async () => {
      const payload = {
        photo: imagesHelper.getDogImage(),
        location: [-23.589543, -46.607310]
      }
      const imageResponse = await imageUploadController.uploadImage(payload)
      expect(urlHelper.isUrl(imageResponse)).toBeTruthy()
    })
  })
})
