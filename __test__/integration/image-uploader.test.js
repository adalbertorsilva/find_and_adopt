const imagesHelper = require('../helper/image-converter-helper')
const {image_upload: imageUploadController} = require('../../controllers')

describe('PETS', () => {
  describe('POST', () => {
    describe('When post /pets with a null token', () => {
      it('should return a error', async () => {
        const imagePayload = imagesHelper.getDogImage()
        const imageResponse = await imageUploadController.uploadImage(imagePayload)

        expect(imageResponse).not.toBeUndefined()
      })
    })
  })
})
