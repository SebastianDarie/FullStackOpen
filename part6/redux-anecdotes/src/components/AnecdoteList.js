import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setVote } from '../reducers/anecdoteReducer'
import {
	setNotification,
	deleteNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const filteredContent = useSelector((state) => state.filter.filteredText)
	const anecdotes = useSelector((state) =>
		state.anecdote
			.sort((a, b) => b.votes - a.votes)
			.filter((anecdote) => anecdote.content.includes(filteredContent))
	)
	const dispatch = useDispatch()

	const vote = (anecdote) => {
		dispatch(setVote(anecdote.id))

		dispatch(setNotification(`you voted '${anecdote.content}'`))

		setTimeout(() => {
			dispatch(deleteNotification())
		}, 5000)
	}

	return (
		<>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</>
	)
}

export default AnecdoteList
