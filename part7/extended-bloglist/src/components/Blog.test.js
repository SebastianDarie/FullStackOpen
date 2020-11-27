import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('<Blog />', () => {
	let component, updateLikes

	beforeEach(() => {
		updateLikes = jest.fn()

		const newBlog = {
			title: 'jest test',
			author: 'react jest',
			url: 'www.react.com',
			likes: 10,
			user: [{ username: 'test user', name: 'jsnahnsjah' }],
		}

		const newUser = {
			username: 'test user',
			name: 'jsnahnsjah',
		}

		window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(newUser))

		component = render(<Blog blog={newBlog} updateBlog={updateLikes} />)
	})

	test(" renders the blog's title and author, but does not render its url or number of likes by default", () => {
		expect(component.container.querySelector('.hidden-info')).toBeDefined
		expect(component.container.querySelector('.hidden-info')).not.toHaveStyle(
			'display: none'
		)
		expect(component.container.querySelector('.hidden-info')).toHaveTextContent(
			'jest test'
		)
		expect(component.container.querySelector('.hidden-info')).toHaveTextContent(
			'react jest'
		)
		expect(
			component.container.querySelector('.hidden-info')
		).not.toHaveTextContent('www.react.com')
		expect(
			component.container.querySelector('.hidden-info')
		).not.toHaveTextContent('10')
	})

	test("blog's url and number of likes are shown when the button has been clicked", () => {
		const button = component.getByText('view')
		fireEvent.click(button)

		expect(component.container.querySelector('.full-info')).not.toHaveStyle(
			'display: none'
		)
		expect(component.container.querySelector('.full-info')).toHaveTextContent(
			'www.react.com'
		)
		expect(component.container.querySelector('.full-info')).toHaveTextContent(
			'10'
		)
	})

	test('if the like button is clicked twice, the event handler is called twice', () => {
		const button = component.getByText('view')
		fireEvent.click(button)

		const likeBtn = component.getByText('like')
		fireEvent.click(likeBtn)
		fireEvent.click(likeBtn)

		expect(component.container.querySelector('.full-info')).not.toHaveStyle(
			'display: none'
		)
		expect(updateLikes.mock.instances.length).toBe(2)
	})
})

describe('<BlogForm />', () => {
	test(' the form calls the event handler when a new blog is created', () => {
		const createBlog = jest.fn()
		const component = render(<BlogForm createBlog={createBlog} />)

		const form = component.container.querySelector('form')
		const title = component.container.querySelector('#title')
		const author = component.container.querySelector('#author')
		const url = component.container.querySelector('#url')
		const likes = component.container.querySelector('#likes')

		fireEvent.change(title, { target: { value: 'Testing the form' } })
		fireEvent.change(author, { target: { value: 'JestReact' } })
		fireEvent.change(url, { target: { value: 'www.jest.com' } })
		fireEvent.change(likes, { target: { value: '12' } })
		fireEvent.submit(form)

		expect(createBlog.mock.calls).toHaveLength(1)
		expect(createBlog.mock.calls[0][0].title).toBe('Testing the form')
		expect(createBlog.mock.calls[0][0].author).toBe('JestReact')
		expect(createBlog.mock.calls[0][0].url).toBe('www.jest.com')
		expect(createBlog.mock.calls[0][0].likes).toBe('12')
	})
})
