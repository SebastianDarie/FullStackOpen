import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import backendServices from './services/Person'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [number, setNumber] = useState('')
	const [filteredPerson, setFilteredPerson] = useState('')
	const [message, setMessage] = useState('')
	const [error, setError] = useState(false)

	useEffect(() => {
		const fetchPersons = async () => {
			const data = await backendServices.getAll()
			setPersons(data)
		}

		fetchPersons()
	}, [])

	const nameHandler = (e) => {
		setNewName(e.target.value)
	}

	const numberHandler = (e) => {
		setNumber(e.target.value)
	}

	const clickHandler = (e) => {
		const currNames = persons.map((person) => person.name)
		const currNumbers = persons.map((person) => person.number)
		const trimmedStr = newName.trim()

		if (!currNames.includes(trimmedStr) && !currNumbers.includes(number)) {
			const person = {
				name: trimmedStr,
				number: number,
				id: Math.floor(Math.random() * 1000),
			}

			backendServices.createPerson(person)

			setPersons([...persons, person])

			setError(false)
			setMessage(`${trimmedStr} was added in the phonebook!`)

			setTimeout(() => {
				setMessage('')
			}, 3500)
		} else if (
			currNames.includes(trimmedStr) &&
			!currNumbers.includes(number)
		) {
			const id = persons.find((el) => el.name === trimmedStr).id
			const person = persons.find((el) => el.id === id)
			let changedPerson = { ...person, number: number }

			let result = window.confirm(
				`${trimmedStr} is already added to phonebook, replace the old number with a new one?`
			)

			if (result) {
				try {
					const updatedPerson = backendServices.updatePerson(
						id,
						changedPerson
					)

					setPersons([
						...persons.map((el) =>
							el.id !== id ? el : updatedPerson
						),
					])

					setError(false)
					setMessage(
						`${trimmedStr}'s number was successfully updated.`
					)

					setTimeout(() => {
						setMessage('')
					}, 3500)
				} catch (error) {
					setError(true)
					setMessage(
						`Information of ${trimmedStr} has already been removed from the server.`
					)

					setTimeout(() => {
						setMessage('')
					}, 3500)
				}
			}
		} else {
			alert(`${trimmedStr} is already added in the phonebook`)
		}

		setNewName('')
		setNumber('')

		e.preventDefault()
	}

	const deleteHandler = (e) => {
		const key = parseInt(e.target.parentNode.dataset.key)
		const name = persons.find((el) => el.id === key).name

		let result = window.confirm(`Delete ${name} ?`)

		if (result) {
			backendServices.deletePerson(key)

			setPersons([...persons.filter((el) => el.id !== key)])

			setError(false)
			setMessage(`${name} was successfully deleted from the server.`)

			setTimeout(() => {
				setMessage('')
			}, 3500)
		}
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
			<Notification
				message={message}
				error={error}
				className={message === '' ? 'hidden' : ''}
			/>
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
			<Persons
				searchedPersons={searchedPersons}
				deleteHandler={deleteHandler}
			/>
		</div>
	)
}

export default App
