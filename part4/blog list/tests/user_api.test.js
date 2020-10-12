const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('post users', () => {
	test('invalid user is not created if short username', async () => {
		const initialUsers = await helper.usersInDB()

		const newUser = {
			username: 'Mi',
			name: 'Fullstack Dev',
			password: 'sasas',
		}

		await api.post('/api/users').send(newUser).expect(400)

		const currUsers = await helper.usersInDB()
		expect(currUsers).toHaveLength(initialUsers.length)
	})

	test('invalid user is not created if duplicate username', async () => {
		const initialUsers = await helper.usersInDB()

		const newUser = {
			username: 'bigbu',
			name: 'Fullstack Dev',
			password: 'asasasa',
		}

		const result = await api.post('/api/users').send(newUser).expect(400)

		expect(result.body.error).toContain('`username` to be unique')

		const currUsers = await helper.usersInDB()
		expect(currUsers).toHaveLength(initialUsers.length)
	})

	test('invalid user is not created if empty password', async () => {
		const newUser = {
			username: 'Miter',
			name: 'Fullstack Dev',
			password: '',
		}

		const result = await api.post('/api/users').send(newUser).expect(400)

		expect(result.body.error).toContain('password too short or empty')
	})
})

afterAll(() => {
	mongoose.connection.close()
})
