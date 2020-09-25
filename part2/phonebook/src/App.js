import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [number, setNumber] = useState('')
	const [filteredPerson, setFilteredPerson] = useState('')

	useEffect(() => {
		fetchPersons()
	}, [])

	const fetchPersons = async () => {
		try {
			const res = await axios.get('http://localhost:3001/persons')
			setPersons([...res.data])
		} catch (error) {
			console.error(error)
		}
	}

	const nameHandler = (e) => {
		setNewName(e.target.value)
	}

	const numberHandler = (e) => {
		setNumber(e.target.value)
	}

	const clickHandler = (e) => {
		const currNames = persons.map((person) => person.name)

		if (!currNames.includes(newName)) {
			setPersons([...persons, { name: newName, number: number }])
		} else {
			alert(`${newName} is already added in the phonebook`)
		}

		setNewName('')
		setNumber('')

		e.preventDefault()
	}

	const filterHandler = (e) => {
		setFilteredPerson(e.target.value.toLowerCase())
	}

	const searchedPersons =
		filteredPerson !== ''
			? persons.filter((person) =>
					person.name.toLowerCase().match('^' + filteredPerson)
			  )
			: persons

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filterHandler={filterHandler} />
			<h3>Add a new</h3>
			<PersonForm
				newName={newName}
				nameHandler={nameHandler}
				number={number}
				numberHandler={numberHandler}
				clickHandler={clickHandler}
			/>
			<h3>Numbers</h3>
			<Persons searchedPersons={searchedPersons} />
		</div>
	)
}

export default App
