const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})

	for (let blog of helper.blogList) {
		const blogObject = new Blog(blog)
		await blogObject.save()
	}
})

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

test('can post blog to db', async () => {
	const newBlog = {
		title: 'Test Blog',
		author: 'Fullstack Dev',
		url: 'www.mernlabs.team',
		likes: 9,
	}

	await api.post('/api/blogs').expect(201).send(newBlog)

	const changedBlogs = await helper.blogsInDB()

	expect(changedBlogs).toHaveLength(helper.blogList.length + 1)
})

test('likes set default to 0', async () => {
	const newBlog = {
		title: 'Test Blog 2',
		author: 'Frontend Dev',
		url: 'www.mernlabs.io',
	}

	await api.post('/api/blogs').expect(201).send(newBlog)

	const addedBlog = await Blog.find({ title: 'Test Blog 2' })

	expect(addedBlog[0].likes).toEqual(0)
})

test('return bad request if not title and url', async () => {
	const newBlog = {
		author: 'Noob Dev',
		likes: 9,
	}

	await api.post('/api/blogs').send(newBlog).expect(400)

	const blogs = await helper.blogsInDB()

	expect(blogs).toHaveLength(helper.blogList.length)
})

//npm test -- tests/blog_api.test.js

afterAll(() => {
	mongoose.connection.close()
})
