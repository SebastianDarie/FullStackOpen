import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, error, className }) => {
	if (error && className !== 'hidden') {
		return <div className='error'>{message}</div>
	} else if (!error && className !== 'hidden') {
		return <div className='success'>{message}</div>
	} else {
		return <></>
	}
}

Notification.propTypes = {
	message: PropTypes.string.isRequired,
	error: PropTypes.bool.isRequired,
	className: PropTypes.string.isRequired,
}

export default Notification
