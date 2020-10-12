const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
	const users = await User.find({}).populate('blogs', {
		title: 1,
		author: 1,
		url: 1,
	})
	res.json(users.map((user) => user))
})

userRouter.post('/', async (req, res) => {
	const body = req.body

	if (!body.password || body.password <= 3) {
		return res.status(400).json({ error: 'password too short or empty' })
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash,
	})

	const savedUser = await user.save()

	res.status(201).json(savedUser)
})

userRouter.delete('/:id', async (req, res) => {
	await User.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

module.exports = userRouter
