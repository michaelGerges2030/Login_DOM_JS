// Today's Variables
let todayDay = document.getElementById("todayName");
let todayDate = document.getElementById("todayDate");
let city = document.getElementById("city");
let todayDegree = document.getElementById("todayDegree");
let todayIcon = document.getElementById("todayIcon");
let todayDescription = document.getElementById("todayDescription");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let compass = document.getElementById("compass");

// Next Two Days Variables
let nextDayName = document.getElementsByClassName('nextDayName'),
nextDayIcon = document.getElementsByClassName('nextDayIcon'),
maxDegree = document.getElementsByClassName('maxDegree'),
minDegree = document.getElementsByClassName('minDegree'),
nextDayDescription = document.getElementsByClassName('nextDayDescription');

// Search Bar Variable
let searchBar = document.getElementById('searchBar')
let currentCity = "London"
let apiResponse,
responseData;

// Months Name Array
let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November" ,"December"],
// Days Names Array
days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

// Fetching the API
async function getWeather(){
    let apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7870c85b6b434a7da2a210531231108&q=${currentCity}&days=3&aqi=no&alerts=no`);
    responseData = await apiResponse.json()
    console.log(responseData);
    getTodayWeather();
    getNextWeather();
}
getWeather()

// Displaying Today's Weather 
function getTodayWeather(){
    let date = new Date()
    todayDay.innerHTML = days[date.getDay()]
    todayDate.innerHTML = `${date.getDate()}  ${months[date.getMonth()]}`
    city.innerHTML = responseData.location.name
    todayDegree.innerHTML = responseData.current.temp_c
    todayIcon.setAttribute("src", `https:${responseData.current.condition.icon}`)
    todayDescription.innerHTML = responseData.current.condition.text
    humidity.innerHTML = responseData.current.humidity
    wind.innerHTML = responseData.current.wind_kph
    compass.innerHTML = responseData.current.wind_dir
}


// Displaying Next two days weather
function getNextWeather(){

   for (let i=0; i<nextDayName.length; i++){
    nextDayName[i].innerHTML = days[new Date(responseData.forecast.forecastday[i+1].date).getDay()]
    nextDayIcon[i].setAttribute('src',`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`)
    maxDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.maxtemp_c
    minDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.mintemp_c  
    nextDayDescription[i].innerHTML = responseData.forecast.forecastday[i+1].day.condition.text 
   }
}

// SearchBar
searchBar.addEventListener('keyup', function(){
    currentCity = searchBar.value;
    console.log(currentCity)
    getWeather();

})