import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateLikes, addComment } from '../reducers/blogReducer'

const BlogView = (blog) => {
	const [comment, setComment] = useState('')

	const dispatch = useDispatch()
	const selected = blog.blog
	const comments = selected ? selected.comments : null

	const updateBlog = () => {
		const updatedBlog = {
			...selected,
			likes: selected.likes + 1,
		}

		dispatch(updateLikes(selected.id, updatedBlog))
	}

	const changeHandler = (e) => {
		setComment(e.target.value)
	}

	const submitHandler = (e) => {
		const commentBlog = {
			...selected,
			comments: selected.comments.concat(comment),
		}
		dispatch(addComment(selected.id, commentBlog))

		setComment('')
		e.preventDefault()
	}

	if (!selected) {
		return null
	}

	return (
		<div>
			<h2>
				{selected.title} {selected.author}
			</h2>
			<p>
				<a href='/'>{selected.url}</a>
			</p>
			<p>
				{selected.likes} likes <button onClick={updateBlog}>like</button>
			</p>
			<p>added by {selected.user.name}</p>

			<h3>comments</h3>

			<form onSubmit={submitHandler}>
				<input value={comment} onChange={changeHandler} />
				<button type='submit'>add comment</button>
			</form>

			<ul>
				{comments.map((comment, idx) => (
					<li key={idx}>{comment}</li>
				))}
			</ul>
		</div>
	)
}

export default BlogView
