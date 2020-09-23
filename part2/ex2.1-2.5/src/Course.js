import React from 'react'

export const Render = ({ courses }) =>
	courses.map((el, index) => <Course key={el.id} course={courses[index]} />)

const Course = ({ course }) => {
	const { name, parts } = course

	return (
		<div>
			<Header name={name} />
			<Content parts={parts} />
			<Total parts={parts} />
		</div>
	)
}

const Header = ({ name }) => {
	return <h2>{name}</h2>
}

const Content = ({ parts }) =>
	parts.map((el) => (
		<Part key={el.id} name={el.name} exercises={el.exercises} />
	))

const Part = ({ name, exercises }) => {
	return (
		<p>
			{name} {exercises}
		</p>
	)
}

const Total = ({ parts }) => {
	const sum = parts.reduce((prev, curr) => prev + curr.exercises, 0)
	return <h3>total of {sum} exercises </h3>
}

export default Course
