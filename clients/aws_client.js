const autoBind = require('auto-bind')
const AWS = require('aws-sdk')
const Bluebird = require('bluebird')
const moment = require('moment')
require('dotenv').config()

class AWSClient {
  constructor () {
    autoBind(this)
    AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID
    AWS.config.secretAccessKey = process.env.AWS_SECRET_KEY
    AWS.config.region = process.env.AWS_REGION
    this.s3 = Bluebird.promisifyAll(new AWS.S3())
    this.rekognition = Bluebird.promisifyAll(new AWS.Rekognition())
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

  async analizeImage (payload) {
    return this.rekognition.detectLabelsAsync(this.createImageBuffer(payload.photo))
  }

  createImageBuffer (photo) {
    const buffer = Buffer.from(photo, 'base64')
    const detectParams = { Image: { Bytes: buffer } }
    return detectParams
  }
}

module.exports = new AWSClient()
