import React from 'react'

const Filter = ({ filterHandler }) => {
	return (
		<div>
			filter shown with <input onChange={filterHandler} />
		</div>
	)
}

export default Filter
