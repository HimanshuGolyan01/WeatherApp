const button = document.getElementById("btn")
const cityName = document.getElementById("location")
const Weather = document.getElementById("weather")
const temp = document.getElementById("orignal-temp")
const feelsLike = document.getElementById("feels-like")
const windSpeed = document.getElementById("wind-speed")
const humidity = document.getElementById("additional")
const card = document.getElementById("card")
console.log(cityName)




button.addEventListener("click",function(){
    const newValue = document.getElementById("search").value.trim()
    if(newValue) {
        getCoords(newValue)
    } 
    else {
        alert("Enter City Name Please")
    }
})

function getCoords(city) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=a4132d23f2a3d2c080249485fd49fec0`)
    .then(response => response.json())
    .then(data => {
        // console.log("data",data[0])
        const {lat, lon} = data[0]
        getWeather(lat , lon)

    })


}

function getWeather(lat , lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a4132d23f2a3d2c080249485fd49fec0&units=metric`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        console.log(data.main.humidity)
        cityName.innerHTML = data.name
        Weather.innerHTML = data.weather[0].main
        temp.innerHTML = "Original temperature: " + data.main.temp
        feelsLike.innerHTML = "Temperature feels like: " + data.main.feels_like
        windSpeed.innerHTML = "Wind speed: " + data.wind.speed +"  "+ windDirection(data.wind.deg)
        humidity.innerHTML = "Humidity: " + data.main.humidity 
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.style.background = 'rgba(255, 255, 255, 0.3)';
        card.style.margin = 'auto';
        card.style.marginTop = '20px';
        card.style.padding = '10px';
        card.style.borderRadius = '10px';
        card.style.width = '60%';  
    })
}

function windDirection(direction) {
    if(direction === 0 || direction === 360) {
        return "North"
    }
    if(direction === 90) {
        return "East"
    }
    if(direction === 180) {
        return "South"
    }
    if(direction === 270) {
        return "West"
    }
    if(direction > 0 && direction < 90) {
        return "North East"
    }
    if(direction > 90 && direction < 180) {
        return "South East"
    }
    if(direction > 180 && direction < 270) {
        return "South West"
    }
    // if(direction > 270 && direction < 360) {
    //     return "North West"
    // }
    (direction > 270 && direction < 360) ? "North West" : ""
}