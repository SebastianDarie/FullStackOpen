import React from 'react'

const Search = ({ searchHandler }) => {
	return (
		<div>
			find countries <input onChange={searchHandler} />
		</div>
	)
}

export default Search
