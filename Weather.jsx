import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'

import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'


const Weather = () => {

    const VITE_APP_ID = "dff4676a6605b844173c87ceaea5e103";
    const [weatherData,setweatherData] = useState(false);
    const inputRef = useRef();
    const allicons ={
        "01d":clear_icon,
        "01n" :clear_icon,
        "02d" :cloud_icon,
        "02n" :cloud_icon,
        "03d" :cloud_icon,
        "03n" :cloud_icon,
        "04d" :drizzle_icon,
        "04n" :drizzle_icon,
        "09d" :rain_icon,
        "09n" :rain_icon,
        "010d" :rain_icon,
        "010n" :rain_icon,
        "13d" :snow_icon,
        "13n" :snow_icon
    }
    const search = async(city) =>{
        try{
              const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${VITE_APP_ID}`
              const response = await fetch(url);
              const data = await response.json();
              console.log(data);
 
               const icons = allicons[data.weather[0].icon] ;
              setweatherData({
                humidity :data.main.humidity,
                windspeed : data.wind.speed,
                temperature : Math.floor(data.main.temp),
                location :data.name,
                icon:icons
            })
            }
        catch(error){
            setweatherData(false);
            console.error("Error fetching weather data:", error);
        }
       
    }
    useEffect(() =>{
        search("Africa")
    },[])

   

  return (
    <div className='weather'>
        <div className="weather1">
            <input ref={inputRef} placeholder='Search'></input>
            <img src={search_icon} onClick={()=>search(inputRef.current.
                value)}></img>
        </div>
           {
            weatherData?<>
                 <img src={weatherData.icon} className="weather-img"></img>
            <p className='temperature'>{weatherData.temperature}*C</p>
            
            <p className='location'>{weatherData.location}</p>
    <div className="wether-data">
         <div className="col">
               <img src={humidity_icon}></img>
               <p>{weatherData.humidity} %</p>
               <span>Humidity</span>
         </div>
         <div className="col">
               <img src={wind_icon}></img>
               <p>{weatherData.windspeed} Km/H</p>
               <span>Wind Speed</span>
         </div>
         
    </div>
            </> :<>
            
              <center>
                  <h2 className='.h22'> OOPs Invalid City</h2>
              </center>

            </>
           }
    </div>
    
  )
}

export default Weather