const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})

	for (let blog of helper.blogList) {
		const blogObject = new Blog(blog)
		await blogObject.save()
	}
})

describe('when there are initial blogs', () => {
	test('notes are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body.length).toBe(helper.blogList.length)
	})

	test('verify unique id field', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body[0].id).toBeDefined()
	})
})

describe('post blogs and validate', () => {
	test('can post blog to db', async () => {
		const userList = await helper.usersInDB()
		const firstUser = {
			username: userList[0].username,
			name: userList[0].name,
			id: userList[0].id,
		}

		let token = jwt.sign(firstUser, process.env.SECRET)

		const newBlog = {
			title: 'Test Blog',
			author: 'Fullstack Dev',
			url: 'www.mernlabs.team',
			likes: 9,
			user: firstUser.id,
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlog)
			.expect(201)

		const changedBlogs = await helper.blogsInDB()

		expect(changedBlogs).toHaveLength(helper.blogList.length + 1)
	})

	test('likes set default to 0', async () => {
		const userList = await helper.usersInDB()
		const firstUser = {
			username: userList[0].username,
			name: userList[0].name,
			id: userList[0].id,
		}

		let token = jwt.sign(firstUser, process.env.SECRET)

		const newBlog = {
			title: 'Test Blog 2',
			author: 'Frontend Dev',
			url: 'www.mernlabs.io',
			user: firstUser.id,
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlog)
			.expect(201)

		const addedBlog = await Blog.find({ title: 'Test Blog 2' })

		expect(addedBlog[0].likes).toEqual(0)
	})

	test('return bad request if not title and url', async () => {
		const userList = await helper.usersInDB()
		const firstUser = {
			username: userList[0].username,
			name: userList[0].name,
			id: userList[0].id,
		}

		let token = jwt.sign(firstUser, process.env.SECRET)

		const newBlog = {
			author: 'Noob Dev',
			likes: 9,
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlog)
			.expect(400)

		const blogs = await helper.blogsInDB()

		expect(blogs).toHaveLength(helper.blogList.length)
	})

	test('return 401 status if no token', async () => {
		const newBlog = {
			title: 'Test Blog',
			author: 'Fullstack Dev',
			url: 'www.mernlabs.team',
			likes: 9,
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `bearer`)
			.send(newBlog)
			.expect(401)

		const blogs = await helper.blogsInDB()

		expect(blogs).toHaveLength(helper.blogList.length)
	})
})

// describe('deletion of a blog', () => {
// 	test('succeeds with status code 204 if id is valid', async () => {
// 		const blogsAtStart = await helper.blogsInDB()
// 		const blogToDelete = blogsAtStart[0]

// 		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

// 		const blogsAtEnd = await helper.blogsInDB()

// 		expect(blogsAtEnd).toHaveLength(helper.blogList.length - 1)

// 		expect(blogsAtEnd).not.toContain(blogToDelete)
// 	})
// })

describe('update of a blog', () => {
	test('succeeds if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDB()
		const blogToUpdate = blogsAtStart[0]

		const changes = {
			title: 'Test Blog',
			author: 'Fullstack Dev',
			url: 'www.mernlabs.io',
			likes: 9,
		}

		const updatedBlog = await api.put(`/api/blogs/${blogToUpdate.id}`, changes)

		const blogsAtEnd = await helper.blogsInDB()

		expect(blogsAtEnd).toHaveLength(helper.blogList.length)

		expect(updatedBlog).not.toEqual(blogToUpdate)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
