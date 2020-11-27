const initialState = {
	message: '',
	error: false,
}

export const setNotification = (message, error, time) => {
	let duration
	return async (dispatch) => {
		clearTimeout(duration)
		await dispatch({ type: 'SET_NOTIFICATION', payload: { message, error } })
		duration = setTimeout(
			() =>
				dispatch({
					type: 'SET_NOTIFICATION',
					payload: { message: '', error: false },
				}),
			time
		)
	}
}

const notificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_NOTIFICATION':
			return {
				...state,
				message: action.payload.message,
				error: action.payload.error,
			}

		default:
			return state
	}
}

export default notificationReducer
