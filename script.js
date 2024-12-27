document.addEventListener("DOMContentLoaded",()=>{
    const cityInput = document.getElementById('city-input');
    const getWeatherButton = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
   const descriptionDisplay = document.getElementById("description");
   const errorMessage = document.getElementById("error-message");
   
   const APIkey = "ec65b195c0933681d9dbcdf6bbabac4b";   // it is like a password each one has unique


    getWeatherButton.addEventListener("click",async()=>{

        const city=cityInput.value.trim();
        if(!city)  return ;

        // IMP things about SErver ****
        //it may throw error
        //server/database is always in another continent


        try {
          const weatherData = await fetchWeatherData(city); // as it will take some time to fetch the data so use async await
          displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }
    })

    async function fetchWeatherData(city){   //gets Data
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`;

      const response=await fetch(url);  // as it will take some time to fetch the data so use async await 
      console.log(typeof response);
      console.log("Response:",response);
        
      if(!response.ok){
        throw new Error("CIty is not in the given list ");
        
      }
      let data =await response.json();
      console.log(data);
    return data;

    }

    function displayWeatherData(data){   //shows the weather data
        const {name,main,weather}=data;
        cityNameDisplay.textContent=name;
        temperatureDisplay.textContent=`Temperature :${main.temp}`;
        descriptionDisplay.textContent=`Weather: ${weather[0].description}`;

        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");

    }

    function showError(){

        weatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }

})