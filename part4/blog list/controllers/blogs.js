const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({})
	res.json(blogs.map((blog) => blog.toJSON()))
})

blogRouter.post('/', async (req, res) => {
	const body = req.body

	if (body.title === undefined || body.url === undefined) {
		return res.status(400).end()
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes === undefined ? 0 : body.likes,
	})

	const savedBlog = await blog.save()

	res.status(201).json(savedBlog)
})

module.exports = blogRouter
