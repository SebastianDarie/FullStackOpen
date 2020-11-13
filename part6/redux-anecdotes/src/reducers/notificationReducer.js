const initialState = {
	message: '',
	show: false,
}

export const setNotification = (message, time) => {
	let duration
	return async (dispatch) => {
		clearTimeout(duration)
		await dispatch({
			type: 'SET_NOTIFICATION',
			payload: { message, show: true },
		})
		duration = setTimeout(() => {
			dispatch({
				type: 'SET_NOTIFICATION',
				payload: { message: '', show: false },
			})
		}, time)
	}
}

const notificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_NOTIFICATION':
			return {
				...state,
				message: action.payload['message'],
				show: action.payload['show'],
			}

		default:
			return state
	}
}

export default notificationReducer
