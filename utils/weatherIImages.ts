const getImageForWeather = (description: string) => {
  const desc = description.toLowerCase()

  if (desc.includes('hail')) {
    return require('../assets/hail.png')
  } else if (desc.includes('snow')) {
    return require('../assets/snow.png')
  } else if (desc.includes('rain') && !desc.includes('no rain')) {
    return require('../assets/rain.png')
  } else if (desc.includes('cloudy')) {
    return require('../assets/cloudy.png')
  } else {
    return require('../assets/sunny.png')
  }
}

export default getImageForWeather
