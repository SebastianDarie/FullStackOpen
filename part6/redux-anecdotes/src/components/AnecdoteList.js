import React from 'react'
import { connect } from 'react-redux'
import { setVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
	const filteredContent = props.filter.filteredText
	const anecdotes = props.anecdote
		.sort((a, b) => b.votes - a.votes)
		.filter((anecdote) => anecdote.content.includes(filteredContent))

	const vote = (anecdote) => {
		props.setVote(anecdote.id)

		props.setNotification(`you voted '${anecdote.content}'`, 5000)
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

const mapStateToProps = (state) => {
	return {
		filter: state.filter,
		anecdote: state.anecdote,
	}
}

export default connect(mapStateToProps, { setVote, setNotification })(
	AnecdoteList
)
