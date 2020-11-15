import React from 'react'
import { connect } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = (props) => {
	const handleChange = (e) => {
		const filterValue = e.target.value

		props.filterAnecdotes(filterValue)
	}

	const style = {
		marginBottom: 10,
	}

	return (
		<div style={style}>
			filter <input onChange={handleChange} />
		</div>
	)
}

export default connect(null, { filterAnecdotes })(Filter)
