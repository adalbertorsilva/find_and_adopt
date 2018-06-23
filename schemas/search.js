const Joi = require('joi')
const { missing_field_error: MissingFieldError } = require('../errors')

const checkError = (errors) => {
  switch (errors[0].type) {
    case 'any.required':
      throw new MissingFieldError(errors[0].path[0])
  }
}

const schema = Joi.object().keys({
  latitude: Joi.string().required().error(errors => checkError(errors)),
  longitude: Joi.string().required().error(errors => checkError(errors)),
  radius: Joi.string().required().error(errors => checkError(errors))
})

module.exports = schema
