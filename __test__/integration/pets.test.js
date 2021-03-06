const request = require('supertest')
const moment = require('moment')
const app = require('../../config/app')
const tokenHelper = require('../helper/token-helper')
const imagesHelper = require('../helper/image-converter-helper')
const urlHelper = require('../helper/url-validator-helper')
const { Pet } = require('../../models')

describe('PETS CONTROLLER INTEGRATION TEST', () => {
  describe('POST', () => {
    describe('When post /pets with a full payload', () => {
      it('should return a 201 status and a response object', async () => {
        const completePayload = {
          location: [-23.589543, -46.607310],
          description: 'Lost dog',
          photo: imagesHelper.getImage('tino')
        }

        const response = await request(app).post('/pets').set('Authorization', tokenHelper.getToken()).send(completePayload)
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('id')
        expect(response.body.id).not.toBeNull()
        expect(response.body).toHaveProperty('location')
        expect(response.body.location).toHaveProperty('coordinates', completePayload.location)
        expect(response.body).toHaveProperty('description', completePayload.description)
        expect(response.body).toHaveProperty('photo')
        expect(urlHelper.isUrl(response.body.photo)).toBeTruthy()
        expect(response.body).toHaveProperty('created_at')
      })
    })

    describe('When post /pets with a missing photo payload', () => {
      it('should return a 422 status and an error message', async () => {
        const completePayload = {
          location: [-23.589543, -46.607310],
          description: 'Lost dog'
        }

        const response = await request(app).post('/pets').set('Authorization', tokenHelper.getToken()).send(completePayload)
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('message', 'The attribute photo is required')
      })
    })

    describe('When post /pets with a missing location payload', () => {
      it('should return a 422 status and an error message', async () => {
        const completePayload = {
          description: 'Lost dog',
          photo: imagesHelper.getImage('tino')
        }

        const response = await request(app).post('/pets').set('Authorization', tokenHelper.getToken()).send(completePayload)
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('message', 'The attribute location is required')
      })
    })

    describe('When post /pets with a missing photo payload', () => {
      it('should return a 422 status and an error message', async () => {
        const completePayload = {
          location: [-23.589543, -46.607310],
          description: 'Lost dog'
        }

        const response = await request(app).post('/pets').set('Authorization', tokenHelper.getToken()).send(completePayload)
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('message', 'The attribute photo is required')
      })
    })

    describe('When post /pets with a location without a coordinate payload', () => {
      it('should return a 422 status and an error message', async () => {
        const completePayload = {
          location: [-23.589543],
          description: 'Lost dog',
          photo: imagesHelper.getImage('tino')
        }

        const response = await request(app).post('/pets').set('Authorization', tokenHelper.getToken()).send(completePayload)
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('message', 'The attribute location must have 2 elements')
      })
    })

    describe('When post /pets with a location with a coordinate extra payload', () => {
      it('should return a 422 status and an error message', async () => {
        const completePayload = {
          location: [-23.589543],
          description: 'Lost dog',
          photo: imagesHelper.getImage('tino')
        }

        const response = await request(app).post('/pets').set('Authorization', tokenHelper.getToken()).send(completePayload)
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('message', 'The attribute location must have 2 elements')
      })
    })
  })

  describe('GET', () => {
    beforeAll(async () => {
      const animal1 = {
        location: {type: 'Point', coordinates: [-23.585596, -46.609693]},
        description: 'Nice puppy',
        created_at: moment().toDate(),
        photo: 'some photo'
      }

      const animal2 = {
        location: {type: 'Point', coordinates: [-23.601071, -46.612600]},
        description: 'Another Nice puppy',
        created_at: moment().toDate(),
        photo: 'some photo'
      }

      const animal3 = {
        location: {type: 'Point', coordinates: [-23.601544, -46.603094]},
        description: 'homeless puppy',
        created_at: moment().toDate(),
        photo: 'some photo'
      }

      await Pet.bulkCreate([animal1, animal2, animal3])
    })

    describe('When get /pets ', () => {
      it('should return a 200 status and a list of four animals', async () => {
        const response = await request(app).get('/pets?long=-23.589543&lat=-46.607310&radius=5000').set('Authorization', tokenHelper.getToken())
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(4)
      })
    })

    describe('When get /pets without a longitude coordinate', () => {
      it('should return a 422 status and a error message', async () => {
        const response = await request(app).get('/pets?lat=-46.607310&radius=5000').set('Authorization', tokenHelper.getToken())
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('message', 'The attribute longitude is required')
      })
    })

    describe('When get /pets without a latitude coordinate', () => {
      it('should return a 422 status and a error message', async () => {
        const response = await request(app).get('/pets?long=-23.589543&radius=5000').set('Authorization', tokenHelper.getToken())
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('message', 'The attribute latitude is required')
      })
    })

    describe('When get /pets without a radius', () => {
      it('should return a 422 status and a error message', async () => {
        const response = await request(app).get('/pets?long=-23.589543&lat=-46.607310').set('Authorization', tokenHelper.getToken())
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('message', 'The attribute radius is required')
      })
    })

    describe('When get /pets/:id ', () => {
      let lostAnimal
      const lostAnimalPayload = {
        location: {type: 'Point', coordinates: [-23.601544, -46.603094]},
        description: 'lost animal',
        created_at: moment().toDate(),
        photo: 'some heart breaking photo'
      }

      beforeEach(async () => {
        lostAnimal = await Pet.create(lostAnimalPayload)
      })

      it('should return a 200 status and a object of a animal', async () => {
        const response = await request(app).get(`/pets/${lostAnimal.id}`).set('Authorization', tokenHelper.getToken())
        expect(response.status).toBe(200)
      })
    })
  })
})
