const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.length === 0
		? 0
		: blogs.reduce((sum, curr) => sum + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
	const likes = blogs.map((el) => el.likes)

	const blog = blogs.find((el) => el.likes === Math.max(...likes))

	return blog
}

const mostBlogs = (blogs) => {
	let count = blogs.reduce((prev, curr) => {
		prev[curr.author] = (prev[curr.author] || 0) + 1
		return prev
	}, {})

	let max = Math.max(...Object.values(count))
	let mostWanted = Object.keys(count).filter((i) => count[i] === max)

	return { author: `${mostWanted}`, blogs: max }
}

const mostLikes = (blogs) => {
	let count = blogs.reduce((prev, curr) => {
		prev[curr.author] = (prev[curr.author] || 0) + curr.likes
		return prev
	}, {})

	let max = Math.max(...Object.values(count))
	let mostLiked = Object.keys(count).filter((i) => count[i] === max)

	return { author: `${mostLiked}`, likes: max }
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
}
