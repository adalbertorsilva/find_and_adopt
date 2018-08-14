class RekognitionResultHelper {
  getLabelsWithoutADog () {
    return { Labels: [
      { Name: 'Human', Confidence: 98.60255432128906 }
    ] }
  }

  getDogLabelsWithoutWithoutMinimumPercentageOfConfidence () {
    return { Labels: [
      { Name: 'Human', Confidence: 98.60255432128906 },
      { Name: 'Dog', Confidence: 84 }
    ] }
  }
}

module.exports = new RekognitionResultHelper()
