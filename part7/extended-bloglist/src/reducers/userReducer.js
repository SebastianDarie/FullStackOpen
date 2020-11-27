import userService from '../services/users'

export const getUsers = () => {
	return async (dispatch) => {
		const users = await userService.getAll()
		dispatch({ type: 'ADD_USERS', payload: users })
	}
}

const userReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_USERS':
			return state.concat(action.payload)

		default:
			return state
	}
}

export default userReducer
