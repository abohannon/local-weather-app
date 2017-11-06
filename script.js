const IP_URL = 'https://ipapi.co/json/'

class WeatherApp {
  constructor () {
    this.tempEl = document.querySelector('.container__temp')
    this.imageEl = document.querySelector('.container__image')
    this.cityEl = document.querySelector('.container__city')
    this.getUserData = this.getUserData.bind(this)
    this.getWeather = this.getWeather.bind(this)
  }
  // fetch the user IP data
  getUserData () {
    fetch(IP_URL)
      .then((response) => {
        if (response.status !== 200) {
          console.log('There was a problem with the IP response.', response.status)
        } else {
          return response.json()
        }
      }).then((userData) => {
        this.getWeather(userData)
      }).catch((error) => console.log(error))
  }
  // use lat and lon from user IP data to fetch local weather data
  getWeather (userData) {
    const {latitude, longitude} = userData
    const API_KEY = 'f563956b1d0ba587267bc6744f0aeeb6'
    const weatherAPI = `https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const REQUEST_URL = proxy + weatherAPI

    fetch(REQUEST_URL)
      .then((response) => {
        if (response.status !== 200) {
          console.log('There was a problem with the weather response.', response.status)
        } else {
          return response.json()
        }
      }).then((weatherData) => {
        console.log('inside second fetch', weatherData)
        this.renderWeatherData({weatherData, userData})
      }).catch((error) => console.log(error))
  }
  // render the data
  renderWeatherData (data) {
    console.log('inside render', data)
    const {temperature, summary} = data.weatherData.currently
    const {city} = data.userData
    this.tempEl.innerHTML = `<span>${temperature}</span>`
    this.imageEl.innerHTML = `<span>${summary}</span>`
    this.cityEl.innerHTML = `<span>${city}</span>`
  }
  // initialize the app by kicking off the first fetch for user data
  initialize () {
    this.getUserData()
  }
}

const weatherApp = new WeatherApp()
weatherApp.initialize()
