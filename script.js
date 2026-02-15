const apiKey = "ca63dc237312822e3bb61bd507c4475c";

let isCelsius = true;

function toggleUnit(){
    isCelsius = !isCelsius;
    getWeather();
}

function getWeather(){

    let city = document.getElementById("city").value.trim();

    if(city === ""){
        alert("Enter city name");
        return;
    }

    let unit = isCelsius ? "metric" : "imperial";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`)
    .then(res => res.json())
    .then(data => {

        if(data.cod !== 200){
            alert(data.message);
            return;
        }

        document.getElementById("temp").innerHTML =
            `Temperature: ${data.main.temp} ${isCelsius ? "°C" : "°F"}`;

        document.getElementById("desc").innerHTML =
            data.weather[0].description;

        document.getElementById("humidity").innerHTML =
            `Humidity: ${data.main.humidity}%`;

        document.getElementById("wind").innerHTML =
            `Wind Speed: ${data.wind.speed}`;

        document.getElementById("icon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    })
    .catch(() => alert("Network error"));
}
