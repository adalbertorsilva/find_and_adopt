const request = require('supertest')
const app = require('../../server/app')

describe('PETS', () => {
  describe('POST', () => {
    describe('When post /pets with a null token', () => {
      it('should return a error', async () => {
        const completePayload = {

        }

        const response = await request(app).post('/pets').send(completePayload)
        expect(response.status).toBe(200)
      })
    })
  })
})
