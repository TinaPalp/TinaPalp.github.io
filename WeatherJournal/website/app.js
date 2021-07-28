const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=db3b19ed77952a2695126d78afc342cd&units=metric';


document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  const today = new Date();
  const currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const fav = document.getElementById('feelings').value;
  const cityId = document.getElementById('zip').value;
  //console.log(baseURL+cityId+apiKey)
  getWeather(baseURL+cityId+apiKey)

  .then(function(data) {
    //console.log(data.main.temp)
    const temperature = data.main.temp
    const city = data.name
    postData('/projectData', {date:currentDate, degree:temperature, cityName:city, feeling:fav })
    updateUI()

  })
  

}

// Async POST
const postData = async ( url = '', data = {})=>{

  const response = await fetch(url, {
  method: 'POST', 
  credentials: 'same-origin', 
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data), // body data type must match "Content-Type" header        
});

  try {
    const newData = await response.json();
    return newData;
  }catch(error) {
  console.log("error", error);
  }
};


const getWeather = async (url) => {
  const res = await fetch(url)
  //console.log(url);
  try {
    const data = await res.json();
    console.log(data)
    return data;

  }
   
  catch(error) {
    console.log("error", error);

  }
}


const updateUI = async () => {
  const request = await fetch('/all')
  try{
    const allData = await request.json()
      //console.log(allData);
      //console.log('updateUI');
      document.getElementById('date').innerHTML = 'Date: '+ allData.date;
      document.getElementById('city').innerHTML = 'City: '+ allData.cityName;
      document.getElementById('temp').innerHTML = 'Temperature: ' + allData.degree + '°';
      document.getElementById('content').innerHTML = 'Feelings: ' + allData.feeling;
  
  } 
  catch(error) {
    console.log("error", error);

  }
}