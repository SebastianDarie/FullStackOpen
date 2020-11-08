const initialState = {
	message: '',
	show: false,
}

export const setNotification = (message) => {
	return {
		type: 'SET_NOTIFICATION',
		payload: message,
	}
}

export const deleteNotification = () => {
	return { type: 'DELETE_NOTIFICATION' }
}

const notificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_NOTIFICATION':
			return { ...state, message: action.payload, show: true }

		case 'DELETE_NOTIFICATION':
			return { ...state, message: '', show: false }

		default:
			return state
	}
}

export default notificationReducer
