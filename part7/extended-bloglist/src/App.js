import React, { useEffect, useRef } from 'react'
import { Switch, Route, Link, Redirect, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogView from './components/BlogView'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import User from './components/User'
import Users from './components/Users'
import blogService from './services/blogs'
import { getBlogs } from './reducers/blogReducer'
import { getUsers } from './reducers/userReducer'
import { logout, refresh } from './reducers/loginReducer'

const App = () => {
	const dispatch = useDispatch()

	const blogs = useSelector((state) => state.blog)
	const user = useSelector((state) => state.user)
	const users = useSelector((state) => state.users)

	const blogFormRef = useRef()

	useEffect(() => {
		dispatch(getBlogs())
		dispatch(getUsers())
	}, [dispatch])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(refresh(user))

			blogService.setToken(user.token)
		}
	}, [dispatch])

	const userMatch = useRouteMatch('/users/:id')
	const profile = userMatch
		? users.find((user) => user.id === userMatch.params.id)
		: null
	const blogMatch = useRouteMatch('/blogs/:id')
	const selectedBlog = blogMatch
		? blogs.find((blog) => blog.id === blogMatch.params.id)
		: null

	return (
		<div className=''>
			{user === null ? (
				''
			) : (
				<nav className='flex flex-row justify-between items-center  w-screen h-12'>
					<div className='ml-5'>
						<Link
							to='/blogs'
							className='font-medium text-gray-500 hover:text-gray-900 mr-5'>
							Blogs
						</Link>

						<Link
							to='/users'
							className='font-medium text-gray-500 hover:text-gray-900'>
							Users
						</Link>
					</div>
					<h2 className='text-4xl tracking-tight font-bold text-gray-900 '>
						Blog App
					</h2>
					{user !== null ? (
						<p>
							{user.name} logged in{' '}
							<button
								className='font-medium text-indigo-600 hover:text-indigo-500 mr-5'
								onClick={() => dispatch(logout())}>
								Logout
							</button>
						</p>
					) : (
						''
					)}
				</nav>
			)}

			<Notification />
			<Switch>
				<Route path='/blogs/:id'>
					<BlogView blog={selectedBlog} />
				</Route>
				<Route path='/users/:id'>
					<User user={profile} />
				</Route>
				<Route path='/users'>
					<Users />
				</Route>
				<Route path='/login'>
					{user === null ? (
						<div className='flex flex-col justify-center items-center h-screen'>
							<h2 className='mb-5 text-3xl'>Log in to application</h2>
							<Togglable buttonLabel='Login'>
								<LoginForm />
							</Togglable>
						</div>
					) : (
						<Redirect to='/' />
					)}
				</Route>
				<Route path='/'>
					{user === null ? (
						<Redirect to='/login' />
					) : (
						<div className='flex flex-col justify-center items-center'>
							<div className='flex  justify-center items-center mt-3 mb-5 '>
								<Togglable buttonLabel='create new' ref={blogFormRef}>
									<BlogForm />
								</Togglable>
							</div>
							{blogs
								.sort((a, b) => b.likes - a.likes)
								.map((blog) => (
									<Blog key={blog.id} blog={blog} />
								))}
						</div>
					)}
				</Route>
			</Switch>
		</div>
	)
}

export default App
