const blogRouter = require('express').Router()
const { response } = require('express')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	res.json(blogs.map((blog) => blog.toJSON()))
})

blogRouter.get('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id).populate('user', {
		username: 1,
		name: 1,
	})
	if (blog) {
		res.json(blog.toJSON())
	} else {
		return res.status(404).end()
	}
})

blogRouter.get('/:id/comments', async (req, res) => {
	const blog = await Blog.findById(req.params.id)
	if (blog) {
		const comments = blog.comments
		res.json(comments)
	} else {
		res.status(404).end()
	}
})

blogRouter.post('/:id/comments', async (req, res) => {
	const body = req.body
	const commentBlog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: body.user.id,
		comments: body.comments,
	}

	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, commentBlog, {
		new: true,
	})
	res.json(updatedBlog)
})

blogRouter.post('/', async (req, res) => {
	const body = req.body

	const decodedToken = jwt.verify(req.token, process.env.SECRET)

	if (!req.token || !decodedToken.id) {
		return res.status(401).json({ error: 'token missing or invalid' })
	}
	const user = await User.findById(decodedToken.id)

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes === undefined ? 0 : body.likes,
		user: user._id,
	})

	if (body.title === undefined || body.url === undefined) {
		return res.status(400).end()
	}

	const savedBlog = await blog.save()

	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

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
	const blog = await Blog.findById(req.params.id)

	const decodedToken = jwt.verify(req.token, process.env.SECRET)

	if (!req.token || !decodedToken.id) {
		return res.status(400).json({ error: 'token missing or invalid' })
	}

	if (blog.user.toString() !== decodedToken.id) {
		return res.status(403).json({ error: 'unauthorized user' })
	}

	const user = await User.findById(blog.user)

	user.blogs = user.blogs.filter((blog) => blog.toString() !== req.params.id)

	await user.save()

	await Blog.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

module.exports = blogRouter
