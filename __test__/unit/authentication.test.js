const tokenHelper = require('../helper/token-helper')
const {authentication: authenticationMiddleware} = require('../../middlewares')
const {null_token_error: NullTokenError,
  invalid_token_error: InvalidTokenError} = require('../../errors')

describe('AUTH', () => {
  describe('When authenticating with a null token', () => {
    it('should return a error', () => {
      expect(() => { authenticationMiddleware.authenticate(tokenHelper.getNullToken()) }).toThrow(NullTokenError)
    })
  })

  describe('When authenticating with a invalid token', () => {
    it('should return a error', () => {
      expect(() => { authenticationMiddleware.authenticate(tokenHelper.getInvalidToken()) }).toThrow(InvalidTokenError)
    })
  })

  describe('When authenticating with a valid token', () => {
    it('should return the encoded obejct', () => {
      expect(authenticationMiddleware.authenticate(tokenHelper.getToken())).toMatchObject({})
    })
  })
})
