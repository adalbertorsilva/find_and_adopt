const autoBind = require('auto-bind')
const AWS = require('aws-sdk')
const Bluebird = require('bluebird')
require('dotenv').config()

class ImageUploadController {
  constructor () {
    autoBind(this)
    AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID
    AWS.config.secretAccessKey = process.env.AWS_SECRET_KEY
    this.s3 = Bluebird.promisifyAll(new AWS.S3())
  }

  async uploadImage (base64Image) {
    const imageBuffer = Buffer.from(base64Image, 'base64')
    const uploadConfig = {
      Key: 'bla.jpg',
      Bucket: process.env.AWS_BUCKET,
      Body: imageBuffer,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg'
    }

    const uploadedImage = await this.s3.putObjectAsync(uploadConfig)
    return uploadedImage
  }
}

module.exports = new ImageUploadController()
