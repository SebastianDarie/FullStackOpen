import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState('')
	const [error, setError] = useState(false)

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs))
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)

			blogService.setToken(user.token)
		}
	}, [])

	const createBlog = async (blog) => {
		const savedBlog = await blogService.create(blog)

		setBlogs(blogs.concat(savedBlog))
		setMessage(`a new blog ${savedBlog.title} by ${savedBlog.author} added`)

		setTimeout(() => {
			setMessage('')
		}, 3500)
	}

	const loginHandler = async (username, password) => {
		try {
			const user = await loginService.login({ username, password })

			window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

			blogService.setToken(user.token)

			setUser(user)
			setMessage('Login Successful')

			setTimeout(() => {
				setMessage('')
			}, 3500)
		} catch (error) {
			setError(true)
			setMessage('Wrong username or password')

			setTimeout(() => {
				setMessage('')
			}, 3500)
		}
	}

	const logoutHandler = () => {
		window.localStorage.clear()

		setUser(null)
		setMessage('Logged Out')

		setTimeout(() => {
			setMessage('')
		}, 3500)
	}

	return (
		<div>
			<h2>Blog List</h2>
			<Notification
				message={message}
				error={error}
				className={message === '' ? 'hidden' : ''}
			/>
			{user === null ? (
				<div>
					<h2>Log in to application</h2>
					<LoginForm loginHandler={loginHandler} />
				</div>
			) : (
				<div>
					<p>
						{user.name} logged in{' '}
						<button onClick={logoutHandler}>logout</button>
					</p>
					<BlogForm createBlog={createBlog} />
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</div>
	)
}

export default App
