import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
	const notification = props.notification.message
	const show = props.notification.show

	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1,
		display: show ? '' : 'none',
		marginBottom: '5px',
	}

	return <div style={style}>{notification}</div>
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification,
		show: state.show,
	}
}

export default connect(mapStateToProps)(Notification)
