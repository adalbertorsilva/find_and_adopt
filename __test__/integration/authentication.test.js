const request = require('supertest')
const app = require('../../config/app')
const tokenHelper = require('../helper/token-helper')

describe('AUTH', () => {
  describe('POST', () => {
    describe('When post /pets with a null token', () => {
      it('should return a error', async () => {
        const response = await request(app).post('/pets')
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message', 'Token can not be null')
      })
    })

    describe('When post /pets with an invalid token', () => {
      it('should return a error', async () => {
        const response = await request(app).post('/pets').set('Authorization', tokenHelper.getInvalidToken())
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message', 'Invalid token !')
      })
    })
  })
})
