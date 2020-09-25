import React, { useState } from 'react'
import axios from 'axios'

import Search from './components/Search'
import CountryList from './components/CountryList'

const App = () => {
	const [searchedCountry, setSearchedCountry] = useState([])
	const [inputText, setInputText] = useState('')

	const searchHandler = async (e) => {
		const searchTerm = e.target.value
		setInputText(searchTerm)
		try {
			const res = await axios.get('https://restcountries.eu/rest/v2/all')
			const data = res.data

			setSearchedCountry([
				...data.filter((country) =>
					country.name.toLowerCase().match(searchTerm)
				),
			])
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div>
			<Search searchHandler={searchHandler} />
			<CountryList
				searchedCountry={searchedCountry}
				inputText={inputText}
			/>
		</div>
	)
}

export default App
