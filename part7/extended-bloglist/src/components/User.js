import React from 'react'
import { useSelector } from 'react-redux'

const User = (user) => {
	const blogs = useSelector((state) => state.blog)
	const name = user.user ? user.user.name : ''
	const id = user.user ? user.user.id : ''

	return (
		<div>
			<h2>{name}</h2>
			<h3>added blogs</h3>
			<ul>
				{blogs
					.filter((blog) => blog.user.id === id)
					.map((blog) => (
						<li key={blog.id}>{blog.title}</li>
					))}
			</ul>
		</div>
	)
}

export default User
