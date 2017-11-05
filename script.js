const app = (data) => {
  console.log(data)
  const {
    temperature,
    time,
    icon,
    precipProbability,
    summary,
    humidity
  } = data.currently

  const tempEl = document.querySelector('.container__temp')
  tempEl.innerHTML = `<span>${temperature}</span>`

  const imageEl = document.querySelector('.container__image')
  imageEl.innerHTML = `<span>${summary}</span>`
}

// fetch user's IP address to get latitude and longitude
const IP_URL = 'https://ipapi.co/json/'

fetch(IP_URL)
  .then((response) => {
    if (response.status !== 200) {
      console.log('Problem with ip response', response.status)
    } else {
      return response.json()
    }
  })
  .then((data) => getWeather(data))
  .catch((error) => console.log('There was an error. IP promise rejected.', error))

// fetch local weather data using user data
const getWeather = (userData) => {
  console.log('user', userData)
  const {latitude, longitude} = userData
  const API_KEY = 'f563956b1d0ba587267bc6744f0aeeb6'
  const weatherAPI = `https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`
  const proxy = 'https://cors-anywhere.herokuapp.com/'
  const REQUEST_URL = proxy + weatherAPI

  fetch(REQUEST_URL)
    .then((response) => {
      if (response.status !== 200) {
        console.log('Problem with response', response.status)
      } else {
        return response.json()
      }
    })
    .then((data) => app(data))
    .catch((error) => console.log('There was an error. Weather promise rejected.', error))
}
