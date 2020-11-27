import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
	const dispatch = useDispatch()

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const [likes, setLikes] = useState('')

	const submitHandler = (e) => {
		e.preventDefault()

		const newBlog = {
			title: title,
			author: author,
			url: url,
			likes: likes,
		}

		dispatch(createBlog(newBlog))

		setTitle('')
		setAuthor('')
		setUrl('')
		setLikes('')
	}
	return (
		<>
			<form onSubmit={submitHandler}>
				<div>
					Title:{' '}
					<input
						className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
						id='title'
						value={title}
						placeholder='An interesting title'
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					Author:{' '}
					<input
						className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
						id='author'
						value={author}
						placeholder='you'
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					URL:{' '}
					<input
						className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
						id='url'
						value={url}
						placeholder='www.google.com'
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<div>
					Likes:{' '}
					<input
						className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
						id='likes'
						value={likes}
						placeholder='3'
						onChange={({ target }) => setLikes(target.value)}
					/>
				</div>
				<div>
					<button
						type='submit'
						className='group relative w-full flex justify-center mt-3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
						Create
					</button>
				</div>
			</form>
		</>
	)
}

export default BlogForm
