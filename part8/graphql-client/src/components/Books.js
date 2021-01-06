import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = ({ show, setError }) => {
  const [genre, setGenre] = useState('all')
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])

  const [getBooks, booksRes] = useLazyQuery(ALL_BOOKS, {
    onCompleted: (data) => setBooks(data.allBooks),
    onError: (error) => setError(error.graphQLErrors[0].message),
  })

  const [getGenres, genresRes] = useLazyQuery(ALL_GENRES, {
    onCompleted: (data) => {
      const genres = data.allBooks
        .map((book) => book.genres)
        .flat()
        .reduce(
          (prev, curr) => (prev.includes(curr) ? prev : [...prev, curr]),
          []
        )
      setGenres(genres)
    },
    onError: (error) => setError(error.graphQLErrors[0].message),
  })

  useEffect(() => {
    getGenres()

    if (genresRes.data) {
      const genres = genresRes.data.allBooks
        .map((book) => book.genres)
        .flat()
        .reduce(
          (prev, curr) => (prev.includes(curr) ? prev : [...prev, curr]),
          []
        )
      setGenres(genres)
    }
  }, [genresRes.data]) //eslint-disable-line

  useEffect(() => {
    const selectedGenre = genre === 'all' ? {} : { variables: { genre } }

    getBooks(selectedGenre)

    if (booksRes.data) {
      setBooks(booksRes.data.allBooks)
    }
  }, [booksRes.data, genre]) //eslint-disable-line

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <p>
        in genre <b>{genre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <select value={genre} onChange={({ target }) => setGenre(target.value)}>
        <option value='all'>all</option>
        {genres.map((genre, i) => (
          <option key={i} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Books
