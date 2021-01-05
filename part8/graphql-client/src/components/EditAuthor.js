import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const EditAuthor = ({ authors }) => {
  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submitHandler = async (e) => {
    e.preventDefault()

    editAuthor({ variables: { name, born } })

    setName('')
    setBorn('')
  }
  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='name'>name</label>
          <select
            id='name'
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            {authors.map((author, i) => (
              <option key={i}>{author.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='born'>born</label>
          <input
            type='number'
            name='born'
            id='born'
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default EditAuthor
