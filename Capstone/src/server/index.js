var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();
const api_key = process.env.API_KEY;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ 
    extended: false 
}));
app.use(bodyParser.json());
app.use(express.static('dist'));

const port = 8081;
const server = app.listen(port, () => {
    console.log(`running on localhost: ${port}`);
});

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
});

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
});

app.post('/text', async(req, res) => {

    //Geoname - General
    const username = process.env.geoName;
    console.log('req.body ===+>', req.body)
    const userData = req.body
    let geoData = ''

    //Geoname - Fetch
    const geonameURL = `http://api.geonames.org/search?q=${userData.destination}&maxRows=1&type=json&username=${username}`
    const response = await fetch(geonameURL);
    try {
      const data = await response.json();
      console.log(data);
      geoData = { lng: data.geonames[0].lng, lat: data.geonames[0].lat, countryName: data.geonames[0].countryName, city: data.geonames[0].toponymName }
    }catch (error) {
      console.log("error", error);
      }
    
    //Weatherbit - General
    const weatherKey = process.env.weatherKey;
    const weatherbitBaseURL = 'http://api.weatherbit.io/v2.0/current?'
    let weatherData = ''

  //Weatherbit - Fetch
  const url = `${weatherbitBaseURL}lat=${geoData.lat}&lon=${geoData.lng}&key=${weatherKey}&units=M`  
  const responseWeather = await fetch(url);
    try {
      const dataWeather = await responseWeather.json();
      console.log(dataWeather)
      weatherData = { temp: dataWeather.data[0].temp, weather: dataWeather.data[0].weather.description, icon: dataWeather.data[0].weather.icon }
    }
    catch (error) {
    console.log("error", error);
    }


    //Pixa General
    const pixaKey = process.env.pixaKey;
    let pixaData = ''

    //Pixa Fetch
    const pixabayURL = `https://pixabay.com/api/?key=${pixaKey}&q=${geoData.city}&category=places&image_type=photo&orientation=horizontal`
    const responsePixa = await fetch(pixabayURL);
    try {
      const dataPixa = await responsePixa.json();
      console.log(dataPixa)
      pixaData = { img: dataPixa.hits[0].webformatURL }
    }
    catch (error) {
    console.log("error", error);
    }


    //sending Data
    let allData = []

    allData = [weatherData, geoData, pixaData]
    res.send(allData)


});