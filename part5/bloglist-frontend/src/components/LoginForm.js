import React, { useState } from 'react'

const LoginForm = ({ loginHandler }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const submitHandler = (e) => {
		loginHandler(username, password)
		setUsername('')
		setPassword('')

		e.preventDefault()
	}

	return (
		<form onSubmit={submitHandler}>
			<div>
				username
				<input
					id='username'
					type='text'
					name='Username'
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					id='password'
					type='password'
					name='Password'
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button id='login-btn' type='submit'>
				login
			</button>
		</form>
	)
}

export default LoginForm
