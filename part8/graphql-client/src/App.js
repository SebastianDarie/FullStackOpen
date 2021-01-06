import React, { useEffect, useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES, BOOK_ADDED } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'

const App = () => {
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  const updateCacheWith = (QUERY, variables, data) => {
    const includedIn = (set, object) =>
      set.map((book) => book.id).includes(object.id)
    const storeData = client.readQuery({
      query: QUERY,
      variables,
    })
    if (!includedIn(storeData.allBooks, data) || QUERY !== ALL_BOOKS) {
      return client.writeQuery({
        query: QUERY,
        variables,
        data: { allBooks: [...storeData.allBooks, data] },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      const genres = addedBook.genres
      window.alert(`${subscriptionData.data.bookAdded.title} added to library.`)
      updateCacheWith(ALL_BOOKS, {}, addedBook)
      updateCacheWith(ALL_GENRES, {}, { __typename: 'Book', genres })
    },
  })

  useEffect(() => {
    const token = localStorage.getItem('currUser')
    if (token) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <>
        <h1>Login</h1>
        <LoginForm setError={setError} setToken={setToken} />
      </>
    )
  }

  if (error) {
    console.log(error)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} setError={setError} />

      <NewBook show={page === 'add'} setError={setError} />

      <Recommended show={page === 'recommended'} />
    </div>
  )
}

export default App
