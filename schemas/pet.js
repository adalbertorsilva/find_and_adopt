const Joi = require('joi')

const schema = Joi.object().keys({
  location: Joi.array().items(Joi.string()).length(2).required(),
  photo: Joi.string().required()
})

module.exports = schema
