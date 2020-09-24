import React from 'react'

const PersonForm = ({
	newName,
	nameHandler,
	number,
	numberHandler,
	clickHandler,
}) => {
	return (
		<>
			<form>
				<div>
					name: <input value={newName} onChange={nameHandler} />
				</div>
				<div>
					number: <input value={number} onChange={numberHandler} />
				</div>
				<div>
					<button type='submit' onClick={clickHandler}>
						add
					</button>
				</div>
			</form>
		</>
	)
}

export default PersonForm
