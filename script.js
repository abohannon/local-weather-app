/* global Skycons:true */
const IP_URL = 'https://ipapi.co/json/'

class WeatherApp {
  constructor () {
    this.tempEl = document.querySelector('.app__primary__top__temp')
    this.imageEl = document.querySelector('.app__primary__icon')
    this.cityEl = document.querySelector('.app__primary__top__city')
    this.secondaryTempOne = document.querySelector('.app__secondary__temp--one')
    this.secondaryTempTwo = document.querySelector('.app__secondary__temp--two')
    this.secondaryTempThree = document.querySelector('.app__secondary__temp--three')
    this.secondarySummaryOne = document.querySelector('.app__secondary__summary--one')
    this.secondarySummaryTwo = document.querySelector('.app__secondary__summary--two')
    this.secondarySummaryThree = document.querySelector('.app__secondary__summary--three')
    this.secondaryIconOne = document.querySelector('.app__secondary__icon--one')
    this.secondaryIconTwo = document.querySelector('.app__secondary__icon--two')
    this.secondaryIconThree = document.querySelector('.app__secondary__icon--three')
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
    const {currently, daily} = data.weatherData
    const {city} = data.userData

    this.tempEl.innerHTML = `<span>${temperature}</span>`
    this.cityEl.innerHTML = `<span>${city}</span>`
    // temp
    this.secondaryTempOne.innerHTML = `${daily.data[0].temperatureHigh}`
    this.secondaryTempTwo.innerHTML = `${daily.data[1].temperatureHigh}`
    this.secondaryTempThree.innerHTML = `${daily.data[2].temperatureHigh}`
    // summary
    this.secondarySummaryOne.innerHTML = `${daily.data[0].summary}`
    this.secondarySummaryTwo.innerHTML = `${daily.data[1].summary}`
    this.secondarySummaryThree.innerHTML = `${daily.data[2].summary}`

    // icons
    const icons = new Skycons({'color': 'white'})
    icons.play()
    console.log(icons)

    icons.add('today', currently.icon)
    icons.add('tomorrow', daily.data[0].icon)
    icons.add('twoDays', daily.data[1].icon)
    icons.add('threeDays', daily.data[2].icon)
  }
  // initialize the app by kicking off the first fetch for user data
  initialize () {
    this.getUserData()
  }
}

const weatherApp = new WeatherApp()
weatherApp.initialize()
