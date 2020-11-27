import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

export const getBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll()
		dispatch({ type: 'ADD_BLOG', payload: blogs })
	}
}

export const createBlog = (newBlog) => {
	return async (dispatch) => {
		try {
			const res = await blogService.create(newBlog)
			const blog = await blogService.getOne(res.id)
			dispatch({ type: 'ADD_BLOG', payload: blog })
			dispatch(setNotification('New blog added!', false, 3500))
		} catch (err) {
			dispatch(setNotification('Error creating blog!', true, 3500))
		}
	}
}

export const updateLikes = (id, blog) => {
	return async (dispatch) => {
		try {
			const response = await blogService.update(id, blog)
			dispatch({ type: 'UPDATE_BLOG', payload: response, id })
		} catch (err) {
			dispatch(setNotification('Error updating blog!', true, 3500))
		}
	}
}

export const removeBlog = (id) => {
	return async (dispatch) => {
		if (window.confirm(`Remove this blog?`)) {
			await blogService.deleteBlog(id)
			dispatch({ type: 'DELETE_BLOG', payload: id })
			dispatch(setNotification('Blog deleted!', false, 3500))
		}
	}
}

export const addComment = (id, commentBlog) => {
	return async (dispatch) => {
		try {
			const response = await blogService.addComment(id, commentBlog)
			dispatch({ type: 'UPDATE_BLOG', payload: response, id })
		} catch (err) {
			dispatch(setNotification('Failed to add comment!', true, 3500))
		}
	}
}

const blogReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_BLOG':
			return state.concat(action.payload)

		case 'UPDATE_BLOG':
			return state.map((blog) =>
				blog.id === action.payload.id ? action.payload : blog
			)

		case 'DELETE_BLOG':
			return state.filter((blog) => blog.id !== action.payload)

		default:
			return state
	}
}

export default blogReducer
