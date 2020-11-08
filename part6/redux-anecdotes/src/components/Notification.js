import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector((state) => state.notification.message)
	const show = useSelector((state) => state.notification.show)
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1,
		display: show ? '' : 'none',
	}

	return <div style={style}>{notification}</div>
}

export default Notification
