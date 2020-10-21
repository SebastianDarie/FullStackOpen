import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState('')
	const [error, setError] = useState(false)

	const blogFormRef = useRef()

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
		blogFormRef.current.toggleVisibility()

		const savedBlog = await blogService.create(blog)

		setBlogs([...blogs, savedBlog])
		setMessage(`a new blog ${savedBlog.title} by ${savedBlog.author} added`)

		setTimeout(() => {
			setMessage('')
		}, 3500)
	}

	const updateBlog = async (id, blog) => {
		try {
			const updatedBlog = await blogService.update(id, blog)

			setBlogs([...blogs.map((blog) => (blog.id !== id ? blog : updatedBlog))])

			setMessage('Succesfully updated likes')

			setTimeout(() => {
				setMessage('')
			}, 3500)
		} catch (error) {
			setError(true)
			setMessage('Failed to update likes')

			setTimeout(() => {
				setMessage('')
			}, 3500)
		}
	}

	const removeBlog = async (id) => {
		try {
			await blogService.deleteBlog(id)

			setBlogs([...blogs.filter((blog) => blog.id !== id)])

			setMessage('Succesfully deleted blog')

			setTimeout(() => {
				setMessage('')
			}, 3500)
		} catch (error) {
			setError(true)
			setMessage('Failed to delete blog')

			setTimeout(() => {
				setMessage('')
			}, 3500)
		}
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
					<Togglable buttonLabel='login'>
						<LoginForm loginHandler={loginHandler} />
					</Togglable>
				</div>
			) : (
				<div>
					<p>
						{user.name} logged in{' '}
						<button onClick={logoutHandler}>logout</button>
					</p>
					<Togglable buttonLabel='new blog' ref={blogFormRef}>
						<BlogForm createBlog={createBlog} />
					</Togglable>
					{blogs
						.sort((a, b) => b.likes - a.likes)
						.map((blog) => (
							<Blog
								key={blog.id}
								blog={blog}
								updateBlog={updateBlog}
								removeBlog={removeBlog}
							/>
						))}
				</div>
			)}
		</div>
	)
}

export default App
