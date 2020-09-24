import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' },
	])
	const [newName, setNewName] = useState('')
	const [number, setNumber] = useState('')
	const [filteredPerson, setFilteredPerson] = useState('')

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
