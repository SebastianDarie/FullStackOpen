const initialState = {
	filteredText: '',
}

export const filterAnecdotes = (filteredText) => {
	return {
		type: 'SET_FILTER',
		payload: filteredText,
	}
}

const filterReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_FILTER':
			return { ...state, filteredText: action.payload }
		default:
			return state
	}
}

export default filterReducer
