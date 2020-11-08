import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
	setNotification,
	deleteNotification,
} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = (e) => {
		const content = e.target.anecdote.value
		e.target.anecdote.value = ''

		dispatch(createAnecdote(content))

		dispatch(setNotification('new anecdote successfully created'))

		setTimeout(() => {
			dispatch(deleteNotification())
		}, 5000)

		e.preventDefault()
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div>
					<input name='anecdote' />
				</div>
				<button>create</button>
			</form>
		</>
	)
}

export default AnecdoteForm
