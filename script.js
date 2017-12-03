/* global Skycons:true */
const IP_URL = 'https://ipapi.co/json/'

class WeatherApp {
  constructor () {
    this.currentTemp = document.querySelector('.current-temp')
    this.currentHighLow = document.querySelector('.highlow-temp')
    this.imageEl = document.querySelector('.app__primary__icon')
    this.cityEl = document.querySelector('.app__primary__top__city')
    this.summary = document.querySelector('.app__primary__summary')
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
    console.log(this.currentTemp)

    this.state = {
      celsius: false
    }
  }

  convertToCelsius (fahrenheit) {
    const celsius = (fahrenheit - 32) / 1.8
    return celsius.toFixed(1)
  }

  handleClick () {
    this.currentTemp.addEventListener('click', () => {
      this.state.celsius = !this.state.celsius
      this.getUserData()
    })
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
        this.renderWeatherData({weatherData, userData})
      }).catch((error) => console.log(error))
  }
  // render the data
  renderWeatherData (data) {
    console.log('inside render', data)

    const {temperature, summary} = data.weatherData.currently
    const {currently, daily} = data.weatherData
    const {city} = data.userData
    let tempToday
    let highToday
    let lowToday
    let highOneDay
    let lowOneDay

    if (!this.state.celsius) {
      tempToday = `${temperature.toFixed(1)}&deg;F`
      highToday = daily.data[0].temperatureHigh.toFixed(1)
      lowToday = daily.data[0].temperatureLow.toFixed(1)

      highOneDay = daily.data[1].temperatureHigh.toFixed(1)
      lowOneDay = daily.data[1].temperatureLow.toFixed(1)
    } else if (this.state.celsius) {
      tempToday = this.convertToCelsius(temperature.toFixed(1)) + '&deg;C'
      highToday = this.convertToCelsius(daily.data[0].temperatureHigh.toFixed(1))
      lowToday = this.convertToCelsius(daily.data[0].temperatureLow.toFixed(1))

      highOneDay = this.convertToCelsius(daily.data[1].temperatureHigh.toFixed(1))
      lowOneDay = this.convertToCelsius(daily.data[1].temperatureLow.toFixed(1))
    }

    this.cityEl.innerHTML = `<span>${city}</span>`

    // temp
    this.currentTemp.innerHTML = tempToday
    this.currentHighLow.innerHTML = `${highToday} <span class="low-temp">/ ${lowToday}</span>`
    this.secondaryTempOne.innerHTML = `${highOneDay} <span class="low-temp">/ ${lowOneDay}</span>`
    this.secondaryTempTwo.innerHTML = `${daily.data[2].temperatureHigh.toFixed(1)} <span class="low-temp">/ ${daily.data[2].temperatureLow.toFixed(1)}</span>`
    this.secondaryTempThree.innerHTML = `${daily.data[3].temperatureHigh.toFixed(1)} <span class="low-temp">/ ${daily.data[3].temperatureLow.toFixed(1)}</span>`

    // summary
    this.summary.innerHTML = `${currently.summary}`
    this.secondarySummaryOne.innerHTML = `${daily.data[1].summary}`
    this.secondarySummaryTwo.innerHTML = `${daily.data[2].summary}`
    this.secondarySummaryThree.innerHTML = `${daily.data[3].summary}`

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
    this.handleClick()
  }
}

const weatherApp = new WeatherApp()
weatherApp.initialize()
