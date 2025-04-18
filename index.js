let cityName = document.querySelector(".weather_city");
//! cityName.textContent = "PUNE, INDIA";       // isko api ke through get Karenge!

let dateTime = document.querySelector(".weather_date_time");

let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");

let w_temprature = document.querySelector(".weather_temperature");

let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let feels_like = document.querySelector(".weather_feelsLike");
let humidity = document.querySelector(".weather_humidity");
let wind_speed = document.querySelector(".weather_wind");
let pressure = document.querySelector(".weather_pressure");

//! Input Search bar me Search kia hua:
let citySearch = document.querySelector(".weather_search");        


const getCountryName = (code) => {
    const regionNamesInEnglish = new Intl.DisplayNames([code], { type: "region" }).of(code);
    return regionNamesInEnglish;
};

const getDateTime = (dt) => {

    const currDate = new Date(dt * 1000);           // converting into miniseconds
    // return currDate;
    
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    
    const formatter = new Intl.DateTimeFormat("en-US", options);
    return formatter.format(currDate);
}

let city = "delhi";             // Default Delhi WIll Be SHown

citySearch.addEventListener("submit", (e)=>{
    e.preventDefault();

    let cityNamee = document.querySelector(".city_name");
    console.log(cityNamee.value);
    city = cityNamee.value;

    cityNamee.value = "";

    getWeatherData();       // Function Called
});

const getWeatherData = async () => {
        
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5f96324c40e1cd248fb12078f1f31964&units=metric`;
    
    //! Calling API:
    try{
        const res = await fetch(weatherUrl);            // fetching API
        const data = await res.json();                 // will convert string data into object form

        if(data.cod !== 200){
            
            let errorMsg = document.querySelector(".error_msg");
            errorMsg.textContent = `❌ ${data.message}, Try Again`;
            
            cityName.innerHTML = "";
            dateTime.innerHTML = "";
            w_forecast.innerHTML = "";
            w_icon.innerHTML = "";
            w_temprature.innerHTML = "";
            w_minTem.innerHTML = "";
            w_maxTem.innerHTML = "";
            feels_like.innerHTML = "";
            humidity.innerHTML = "";
            pressure.innerHTML = "";
            wind_speed.innerHTML = "";

            //! alert("City Not Found");

            setTimeout(()=>{
                errorMsg.textContent = "";      // Hide error message
                city = "delhi";
                getWeatherData();
            }, 1400);

            return;
        }
        
        console.log(data);
        
        // Now Fetching Relevant Details! Object Destructuring:
        const {main, name, weather, wind, sys, dt} = data;
        
        
        cityName.innerHTML = `${name}, ${getCountryName(sys.country)} <br>`;
        dateTime.innerHTML = getDateTime(dt);
        
        w_forecast.innerHTML = `ForeCast: ${weather[0].main}`;
        w_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}"/>`;

        
        w_temprature.innerHTML =`${main.temp}&#176 C`;
        
        w_minTem.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;
        w_maxTem.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;

        feels_like.innerHTML = `${main.feels_like}&#176`;
        humidity.innerHTML = `${main.humidity}%`;
        pressure.innerHTML = `${main.pressure} h Pa`;
        wind_speed.innerHTML = `${wind.speed}, <br/> Direction: ${wind.deg}&#176`;
    }
    catch(error){
        console.log(error);
    }
    
};

getWeatherData();           // FETCH





















