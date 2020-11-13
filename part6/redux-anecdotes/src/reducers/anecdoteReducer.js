const getId = () => (100000 * Math.random()).toFixed(0)

const incVotes = (obj) => {
	obj.votes += 1
	return obj
}

export const createAnecdote = (newAnecdote) => {
	return {
		type: 'ADD_ANECDOTE',
		payload: newAnecdote,
	}
}

export const setVote = (id) => {
	return {
		type: 'SET_VOTE',
		payload: id,
	}
}

export const initializeAnecdotes = (anecdotes) => {
	return {
		type: 'INIT_ANECDOTES',
		payload: anecdotes,
	}
}

const anecdoteReducer = (state = [], action) => {
	console.log('state now: ', state)
	console.log('action', action)

	switch (action.type) {
		case 'ADD_ANECDOTE':
			return [...state, action.payload]

		case 'SET_VOTE':
			const newState = state.map((anecdote) =>
				anecdote.id === action.payload ? incVotes(anecdote) : anecdote
			)
			return newState

		case 'INIT_ANECDOTES':
			return action.payload

		default:
			return state
	}
}

export default anecdoteReducer
