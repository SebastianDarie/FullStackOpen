import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, res] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (res.data) {
      const token = res.data.login.value
      setToken(token)
      localStorage.setItem('currUser', token)
    }
  }, [res.data]) //eslint-disable-line

  const submitHandler = (e) => {
    e.preventDefault()

    login({ variables: { username, password } })

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor='username'>username</label>
      <input
        type='text'
        name='username'
        id='username'
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <br />
      <label htmlFor='password'>password</label>
      <input
        type='password'
        name='password'
        id='password'
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <br />
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm
