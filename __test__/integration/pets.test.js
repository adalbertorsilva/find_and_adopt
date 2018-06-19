const request = require('supertest')
const app = require('../../server/app')
const tokenHelper = require('../helper/token-helper')
// const imagesHelper = require('../helper/image-converter-helper')

describe('PETS', () => {
  describe('POST', () => {
    describe('When post /pets with a null token', () => {
      it('should return a error', async () => {
        const completePayload = {
          location: [-23.589543, -46.607310],
          description: 'Lost dog',
          photo: 'some nice picture'
        }

        const response = await request(app).post('/pets').set('Authorization', tokenHelper.getToken()).send(completePayload)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('id')
      })
    })
  })
})
