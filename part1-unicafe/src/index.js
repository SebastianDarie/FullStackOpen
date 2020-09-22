import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const goodHandler = () => {
		setGood(good + 1)
	}
	const badHandler = () => {
		setBad(bad + 1)
	}
	const neutralHandler = () => {
		setNeutral(neutral + 1)
	}

	return (
		<div>
			<h1>give feedback</h1>
			<Button text='good' clickHandler={goodHandler} />
			<Button text='neutral' clickHandler={neutralHandler} />
			<Button text='bad' clickHandler={badHandler} />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	)
}

const Button = ({ text, clickHandler }) => {
	return <button onClick={clickHandler}> {text} </button>
}

const Statistics = ({ good, neutral, bad }) => {
	let all = good + neutral + bad
	let avg = (good - bad) / all
	let pos = (good / all) * 100

	if (all === 0) {
		return (
			<>
				<h1>statistics</h1>
				<p>No feedback given</p>
			</>
		)
	}

	return (
		<>
			<h1>statistics</h1>
			<table>
				<tbody>
					<Statistic text='good' value={good} />
					<Statistic text='neutral' value={neutral} />
					<Statistic text='bad' value={bad} />
					<Statistic text='all' value={all} />
					<Statistic text='average' value={avg.toFixed(1)} />
					<Statistic text='positive' value={pos.toFixed(1) + '%'} />
				</tbody>
			</table>
		</>
	)
}

const Statistic = ({ text, value }) => {
	return (
		<>
			<tr>
				<td>{text}</td>
				<td>{value}</td>
			</tr>
		</>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
