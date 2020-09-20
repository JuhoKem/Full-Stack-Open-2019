import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const Weather = ({country}) => {
    const props  = country
    const one = props[0]

    const [ weather, setWeather ] = useState({})

    // REACT_APP_API_KEY=0574f48f81a053bc56cba6db012d15cd npm start
    // access_key:'0574f48f81a053bc56cba6db012d15cd', 
    const apiKey = process.env.REACT_APP_API_KEY
    const params = {access_key:apiKey, 
        query:one, 
        units:'m'}

    const getWeather = () => {
        console.log('weather effect')
        console.log('GET', 'http://api.weatherstack.com/current', params);
        Axios
            .get('http://api.weatherstack.com/current', {params})
            .then(response => {
                console.log('weather promise fullfilled');
                setWeather(response.data.current)
            //.catch((e) => console.log(e))
            console.log('render', weather.lenght, 'kpl');
            })
    }

    useEffect(getWeather, [])

    return (
        <div>
            <h3>Weather in {country}</h3>
            <p>
                <strong>temperature: </strong> {weather.temperature} celcius
            </p>
            <img src={weather.weather_icons} alt={weather.weather_descriptions}/>
            <p>
                <strong> wind: </strong> {weather.wind_speed} mph direction {weather.wind_dir}
            </p>
        </div>
    )
}

export default Weather