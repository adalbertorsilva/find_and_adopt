const tokenHelper = require('../helper/token-helper')
const {authentication: authenticationMiddleware} = require('../../middlewares')

describe('AUTH', () => {
  describe('When authenticating with a null token', () => {
    it('should return a error', () => {
      expect(() => { authenticationMiddleware.authenticate(tokenHelper.getNullToken()) }).toThrow()
    })
  })
})
