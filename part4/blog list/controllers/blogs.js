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

blogRouter.put('/:id', async (req, res) => {
	const body = req.body

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	}

	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
		new: true,
	})
	res.json(updatedBlog)
})

blogRouter.delete('/:id', async (req, res) => {
	await Blog.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

module.exports = blogRouter
