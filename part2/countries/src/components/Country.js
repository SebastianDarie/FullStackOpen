import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ searchedCountry }) => {
	const { name, capital, population, languages, flag } = searchedCountry

	const [weather, setWeather] = useState(null)

	useEffect(() => {
		fetchWeather(capital)
		//eslint-disable-next-line
	}, [])

	const fetchWeather = async (capital) => {
		const api_key = process.env.REACT_APP_API_KEY

		try {
			const res = await axios.get('http://api.weatherstack.com/current', {
				params: {
					access_key: api_key,
					query: capital,
				},
			})
			const data = res.data
			setWeather(data)
		} catch (error) {
			console.error(error)
		}
	}

	const renderWeather = (weather) => {
		return (
			<>
				<h3>Weather in {weather.request.query}</h3>
				<p>
					<b>temperature:</b> {weather.current.temperature} Celcius
				</p>
				<img
					src={weather.current.weather_icons}
					alt='weather-icon'></img>
				<p>
					<b>wind: </b>
					{weather.current.wind_speed} kph direction{' '}
					{weather.current.wind_dir}
				</p>
			</>
		)
	}

	return (
		<div>
			<h2>{name}</h2>
			<p>capital {capital}</p>
			<p>population {population}</p>
			<h3>languages</h3>
			<ul>
				{languages.map((lang) => (
					<li key={lang.iso639_1}>{lang.name}</li>
				))}
			</ul>
			<img src={flag} alt='flag' style={{ width: 125 }}></img>
			{weather && weather.current ? (
				renderWeather(weather)
			) : (
				<p>Loading Weather...</p>
			)}
		</div>
	)
}

export default Country
