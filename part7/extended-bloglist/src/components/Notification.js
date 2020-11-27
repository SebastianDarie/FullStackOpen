import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
	const message = useSelector((state) => state.notification.message)
	const error = useSelector((state) => state.notification.error)

	if (message) {
		return (
			<div className='alert-banner w-full fixed top-0'>
				<input type='checkbox' className='hidden' id='banneralert' />

				<label
					className={`close cursor-pointer flex items-center justify-between w-full p-2 shadow text-white ${
						error ? 'bg-red-500' : 'bg-green-500'
					}`}
					title='close'
					htmlFor='banneralert'>
					{message}
					<svg
						className='fill-current text-white'
						xmlns='http://www.w3.org/2000/svg'
						width='18'
						height='18'
						viewBox='0 0 18 18'>
						<path d='M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z'></path>
					</svg>
				</label>
			</div>
		)
	} else {
		return <></>
	}
}

export default Notification
