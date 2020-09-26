import React from 'react'

const Persons = ({ searchedPersons, deleteHandler }) => {
	return (
		<>
			{searchedPersons.map((person) => (
				<p key={person.name} data-key={person.id}>
					{person.name} {person.number}{' '}
					<button type='button' onClick={deleteHandler}>
						delete
					</button>
				</p>
			))}
		</>
	)
}

export default Persons
