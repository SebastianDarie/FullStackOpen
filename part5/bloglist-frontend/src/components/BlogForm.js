import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const [likes, setLikes] = useState('')

	const submitHandler = (e) => {
		const newBlog = {
			title: title,
			author: author,
			url: url,
			likes: likes,
		}

		createBlog(newBlog)

		setTitle('')
		setAuthor('')
		setUrl('')
		setLikes('')

		e.preventDefault()
	}
	return (
		<>
			<form onSubmit={submitHandler}>
				<div>
					title:{' '}
					<input
						id='title'
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author:{' '}
					<input
						id='author'
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url:{' '}
					<input
						id='url'
						value={url}
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<div>
					likes:{' '}
					<input
						id='likes'
						value={likes}
						onChange={({ target }) => setLikes(target.value)}
					/>
				</div>
				<div>
					<button type='submit'>create</button>
				</div>
			</form>
		</>
	)
}

export default BlogForm
