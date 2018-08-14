const base64Img = require('base64-img')

class ImageConverterHelper {
  getImage (imageName) {
    const dogImage = base64Img.base64Sync(`${__dirname}/images/${imageName}.jpg`)
    return dogImage.replace(/^data:image\/\w+;base64,/, '')
  }
}

module.exports = new ImageConverterHelper()
