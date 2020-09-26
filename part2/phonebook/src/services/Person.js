import axios from 'axios'

const URL = 'http://localhost:3001/persons'

const getAll = async () => {
	const res = await axios.get(URL)
	return res.data
}

const createPerson = async (person) => {
	const res = await axios.post(URL, person)
	return res.data
}

const updatePerson = async (id, changes) => {
	const res = await axios.put(`${URL}/${id}`, changes)
	return res.data
}

const deletePerson = async (id) => {
	return await axios.delete(`${URL}/${id}`)
}

export default {
	getAll,
	createPerson,
	updatePerson,
	deletePerson,
}
