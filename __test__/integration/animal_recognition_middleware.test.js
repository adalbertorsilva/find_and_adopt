const request = require('supertest')
const app = require('../../config/app')
const tokenHelper = require('../helper/token-helper')
const imagesHelper = require('../helper/image-converter-helper')

describe('ANIMAL RECOGNITION MIDDLEWARE INTEGRATION TEST', () => {
  describe('POST', () => {
    describe('When post /pets with a non dog image', () => {
      it('should return a error', async () => {
        const nonDogImagePayload = {
          location: [-23.589543, -46.607310],
          description: "Watch out ! It's not a dog !",
          photo: imagesHelper.getImage('cat')
        }
        const response = await request(app).post('/pets').set('Authorization', tokenHelper.getToken()).send(nonDogImagePayload)
        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('message', 'There is no dog on the image')
      })
    })

    describe('When post /pets with a non certain dog image', () => {
      it('should return a error', async () => {
        const nonDogImagePayload = {
          location: [-23.589543, -46.607310],
          description: 'Is that a dog ?',
          photo: imagesHelper.getImage('tino2')
        }
        const response = await request(app).post('/pets').set('Authorization', tokenHelper.getToken()).send(nonDogImagePayload)
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('message', 'We are not sure if a dog is present on the image, could you take a better picture ?')
      })
    })
  })
})
