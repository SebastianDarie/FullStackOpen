import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
	const res = await axios.get(baseUrl)
	return res.data
}

const createNew = async (newAnecdote) => {
	const res = await axios.post(baseUrl, newAnecdote)
	return res.data
}

const updateVotes = async (id) => {
	const oldAnecdote = await axios.get(`${baseUrl}/${id}`)
	const updatedAnecdote = {
		content: oldAnecdote.data.content,
		id: id,
		votes: oldAnecdote.data.votes + 1,
	}
	const res = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
	return res.data
}

export default { getAll, createNew, updateVotes }
