import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog }) => {
	const [showInfo, setShowInfo] = useState(false)

	const loggedUser = JSON.parse(
		window.localStorage.getItem('loggedBlogAppUser')
	)

	const authorized = blog.user.username === loggedUser.username

	const updateLikes = () => {
		const updatedBlog = {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes + 1,
			user: blog.user,
		}

		updateBlog(blog.id, updatedBlog)
	}

	const del = () => {
		let result = window.confirm(`Remove ${blog.title} by ${blog.author}`)

		if (result) {
			removeBlog(blog.id)
		}
	}

	const hideInfo = {
		border: 'solid',
		borderWidth: 1,
		padding: 10,
		marginTop: 5,
		marginBottom: 5,
		display: showInfo ? 'none' : '',
	}
	const showFullInfo = {
		border: 'solid',
		borderWidth: 1,
		padding: 10,
		marginTop: 5,
		marginBottom: 5,
		display: showInfo ? '' : 'none',
	}

	const showDeleteBtn = {
		color: 'white',
		backgroundColor: 'red',
		border: 'none',
		borderRadius: 10,
		display: authorized ? '' : 'none',
	}

	const toggleInfo = () => {
		setShowInfo(!showInfo)
	}

	return (
		<div>
			<div style={hideInfo} className='hidden-info'>
				{blog.title} {blog.author}
				<button onClick={toggleInfo}>view</button>
			</div>
			<div style={showFullInfo} className='full-info'>
				<div>
					{blog.title} <button onClick={toggleInfo}>hide</button>
				</div>
				<div>{blog.url}</div>
				<div>
					likes {blog.likes} <button onClick={updateLikes}>like</button>
				</div>
				<div>{blog.author}</div>
				<button style={showDeleteBtn} onClick={del}>
					remove
				</button>
			</div>
		</div>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	updateBlog: PropTypes.func.isRequired,
	removeBlog: PropTypes.func.isRequired,
}

export default Blog
