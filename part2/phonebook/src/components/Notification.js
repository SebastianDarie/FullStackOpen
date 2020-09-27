import React from 'react'

const Notification = ({ message, error, className }) => {
	if (error && className !== 'hidden') {
		return <div className='error'>{message}</div>
	} else if (!error && className !== 'hidden') {
		return <div className='success'>{message}</div>
	} else {
		return <></>
	}
}

export default Notification
