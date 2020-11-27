import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'

const LoginForm = () => {
	const dispatch = useDispatch()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const submitHandler = (e) => {
		dispatch(login(username, password))
		setUsername('')
		setPassword('')

		e.preventDefault()
	}

	return (
		<form onSubmit={submitHandler}>
			<div className='rounded-md shadow-sm -space-y-px'>
				<input
					className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
					id='username'
					type='text'
					name='Username'
					value={username}
					placeholder='Username'
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div className='rounded-md shadow-sm -space-y-px'>
				<input
					className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
					id='password'
					type='password'
					name='Password'
					value={password}
					placeholder='123456'
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>

			<button
				id='login-btn'
				type='submit'
				className='group relative w-full flex justify-center mt-3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
				<span className='absolute left-0 inset-y-0 flex items-center pl-3'>
					<svg
						className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 20 20'
						fill='currentColor'
						aria-hidden='true'>
						<path
							fillRule='evenodd'
							d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
							clipRule='evenodd'
						/>
					</svg>
				</span>
				Sign in
			</button>
		</form>
	)
}

export default LoginForm
