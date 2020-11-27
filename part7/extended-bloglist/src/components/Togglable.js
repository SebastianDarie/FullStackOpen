import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return { toggleVisibility }
	})

	return (
		<div className='mt-8 lex lg:mt-0 lg:flex-shrink-0'>
			<div style={hideWhenVisible} className='inline-flex rounded-md shadow'>
				<button
					onClick={toggleVisibility}
					className='w-full flex items-center justify-center px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700'>
					{props.buttonLabel}
				</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button
					onClick={toggleVisibility}
					className='
					w-full flex items-center justify-center mt-5 px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700
					'>
					Cancel
				</button>
			</div>
		</div>
	)
})

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
