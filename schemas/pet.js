const Joi = require('joi')
const { missing_field_error: MissingFieldError,
  invalid_location_error: InvalidLocationError } = require('../errors')

const checkError = (errors) => {
  switch (errors[0].type) {
    case 'any.required':
      throw new MissingFieldError(errors[0].path[0])
    case 'array.length':
      throw new InvalidLocationError()
  }
}

const schema = Joi.object().keys({
  location: Joi.array().items(Joi.number()).length(2).required().error(errors => checkError(errors)),
  photo: Joi.string().required().error(errors => checkError(errors)),
  description: Joi.string()
})

module.exports = schema
