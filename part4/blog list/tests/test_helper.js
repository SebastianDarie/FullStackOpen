const Blog = require('../models/blog')
const User = require('../models/user')

const blogList = [
	{
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
	},
	{
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url:
			'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
	},
	{
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
	},
	{
		title: 'First class tests',
		author: 'Robert C. Martin',
		url:
			'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
	},
	{
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url:
			'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
	},
	{
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
	},
]

const userList = [
	{
		name: 'Park',
		username: 'Norris',
		password: '@wye#SP&7z?YAEuX',
	},
	{
		name: 'Davenport',
		username: 'Conrad',
		password: 'bNc9FhW-#GqP$Y4$',
	},
	{
		name: 'Wiggins',
		username: 'Christian',
		password: '4Sw!T%w+w4BgXBD_',
	},
	{
		name: 'Frederick',
		username: 'Moses',
		password: 'G*BWHgT9zV6H2bze',
	},
]

const blogsInDB = async () => {
	const blogs = await Blog.find({})
	return blogs.map((blog) => blog.toJSON())
}

const usersInDB = async () => {
	const users = await User.find({})
	return users.map((user) => user.toJSON())
}

module.exports = {
	blogList,
	blogsInDB,
	userList,
	usersInDB,
}
