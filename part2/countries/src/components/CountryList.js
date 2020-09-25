import React, { useState, useEffect } from 'react'
import Country from './Country'

const CountryList = ({ searchedCountry, inputText }) => {
	const [displayCountry, setDisplayCountry] = useState([])
	const [showCountry, setShowCountry] = useState(false)

	useEffect(() => {
		setShowCountry(false)
	}, [inputText])

	const clickHandler = (e) => {
		const text = e.target.parentNode.innerText.slice(0, -5)
		const country = searchedCountry.filter((el) => el.name === text)

		setDisplayCountry(...country)
		setShowCountry(true)
	}

	return (
		<div>
			{searchedCountry.length > 10 ? (
				<p>Too many matches,specify another filter</p>
			) : searchedCountry.length === 1 ? (
				<Country searchedCountry={searchedCountry[0]} />
			) : showCountry ? (
				<Country searchedCountry={displayCountry} />
			) : (
				searchedCountry.map((country) => (
					<p key={country.name}>
						{country.name}{' '}
						<button type='submit' onClick={clickHandler}>
							show
						</button>
					</p>
				))
			)}
		</div>
	)
}

export default CountryList
