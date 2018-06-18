const base64Img = require('base64-img')

class ImageConverterHelper {
  getDogImage () {
    const dogImage = base64Img.base64Sync('images/tino.jpg')
    return dogImage.replace(/^data:image\/\w+;base64,/, '')
  }
}

module.exports = new ImageConverterHelper()
