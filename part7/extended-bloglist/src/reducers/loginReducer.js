import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

export const login = (username, password) => {
	return async (dispatch) => {
		try {
			const user = await loginService.login({ username, password })
			await blogService.setToken(user.token)
			dispatch({ type: 'LOGIN', payload: user })
			dispatch(setNotification('Login successful!', false, 3500))
		} catch (err) {
			dispatch(setNotification('Wrong username or password!', true, 3500))
		}
	}
}

export const logout = () => {
	return async (dispatch) => {
		dispatch({ type: 'LOGOUT' })
		dispatch(setNotification(' Logged out!', false, 3500))
	}
}

export const refresh = (user) => {
	return async (dispatch) => {
		await blogService.setToken(user)
		dispatch({ type: 'REFRESH', payload: user })
	}
}

const loginReducer = (state = null, action) => {
	let newState = {}
	switch (action.type) {
		case 'LOGIN':
			window.localStorage.setItem(
				'loggedBlogAppUser',
				JSON.stringify(action.payload)
			)
			newState = action.payload
			return newState

		case 'LOGOUT':
			window.localStorage.removeItem('loggedBlogAppUser')
			return null

		case 'REFRESH':
			newState = action.payload
			return newState

		default:
			return state
	}
}

export default loginReducer
