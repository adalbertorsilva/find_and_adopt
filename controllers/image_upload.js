const autoBind = require('auto-bind')
const AWS = require('aws-sdk')
const Bluebird = require('bluebird')
const moment = require('moment')
require('dotenv').config()

class ImageUploadController {
  constructor () {
    autoBind(this)
    AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID
    AWS.config.secretAccessKey = process.env.AWS_SECRET_KEY
    this.s3 = Bluebird.promisifyAll(new AWS.S3())
  }

  async uploadImage (payload) {
    const imageBuffer = Buffer.from(payload.photo, 'base64')
    const uploadConfig = {
      Key: `${payload.location[0]}${payload.location[1]}${moment().valueOf()}.jpg`,
      Bucket: process.env.AWS_BUCKET,
      Body: imageBuffer
    }

    const uploadedImage = await this.s3.uploadAsync(uploadConfig)
    return uploadedImage.Location
  }
}

module.exports = new ImageUploadController()
