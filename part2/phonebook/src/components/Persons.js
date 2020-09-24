import React from 'react'

const Persons = ({ searchedPersons }) => {
	return (
		<>
			{searchedPersons.map((person) => (
				<p key={person.name}>
					{person.name} {person.number}
				</p>
			))}
		</>
	)
}

export default Persons
