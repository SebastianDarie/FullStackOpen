describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		const user = {
			name: 'Darie Sebastian',
			username: 'seby',
			password: '2772',
		}
		cy.request('POST', 'http://localhost:3001/api/users', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function () {
		cy.contains('login').click()
	})

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.contains('login').click()
			cy.get('#username').type('seby')
			cy.get('#password').type('2772')
			cy.get('#login-btn').click()

			cy.contains('Login Successful')
		})

		it('fails with wrong credentials', function () {
			cy.contains('login').click()
			cy.get('#username').type('seby')
			cy.get('#password').type('27772')
			cy.get('#login-btn').click()

			cy.get('.error')
				.contains('Wrong username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
		})
	})

	describe('When logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'seby', password: '2772' })
		})

		it('A blog can be created', function () {
			cy.contains('button', 'new blog').click()

			cy.get('#title').type('cypress blog')
			cy.get('#author').type('cypress')
			cy.get('#url').type('www.cypress.test.com')
			cy.get('#likes').type('5')

			cy.contains('button', 'create').click()

			cy.get('html').contains('cypress')
			cy.get('html').contains('5')
		})

		it('A blog can be liked', function () {
			cy.createBlog({
				title: 'test like',
				author: 'me',
				url: 'http/react',
				likes: '3',
			})
			cy.contains('button', 'view').click()
			cy.contains(3)
			cy.contains('button', 'like').click()
			cy.contains(4)
		})

		it('User who created a blog can delete it', function () {
			cy.createBlog({
				title: 'test like',
				author: 'me',
				url: 'http/react',
				likes: '3',
			})
			cy.contains('me')

			cy.contains('button', 'view').click()
			cy.contains('button', 'remove').click()

			cy.should('not.contain', 'me')
		})
	})

	describe('When another user is logged in', function () {
		it('cannot delete other blogs', function () {
			const user2 = {
				name: 'test user',
				username: 'test',
				password: '3883',
			}
			cy.request('POST', 'http://localhost:3001/api/users', user2)

			cy.login({ username: 'seby', password: '2772' })
			cy.createBlog({
				title: 'seby like',
				author: 'seby',
				url: 'http/ract',
				likes: '5',
			})
			cy.contains('button', 'logout').click()

			cy.login({ username: 'test', password: '3883' })
			cy.get('html').contains('seby')
			cy.get('html').contains('5')

			cy.get('#delete-btn').should('have.css', 'display', 'none')
		})
	})

	describe('Sort blogs by likes', function () {
		it('test sorting', function () {
			cy.login({ username: 'seby', password: '2772' })
			cy.createBlog({
				title: 'seby min',
				author: 'seby',
				url: 'http/ract',
				likes: '3',
			})
			cy.createBlog({
				title: 'seby med',
				author: 'seby',
				url: 'http/ract',
				likes: '5',
			})
			cy.createBlog({
				title: 'seby max',
				author: 'seby',
				url: 'http/ract',
				likes: '7',
			})

			cy.get('.likes')
				.invoke('text')
				.then(($likes) => {
					let arr = $likes
						.replace(/likes /g, '')
						.replace(/like/g, '')
						.trim()
						.split(' ')

					arr = arr.map((el) => Number(el))

					expect(arr).to.have.length(3)
					expect(arr[0] > arr[1] && arr[1] > arr[2]).equal(true)
				})
		})
	})
})
