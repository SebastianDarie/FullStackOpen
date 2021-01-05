import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_ME } from '../queries'

const Recommended = (props) => {
  const res = useQuery(ALL_BOOKS)
  const user = useQuery(GET_ME)

  if (!props.show || res.loading || user.loading) {
    return null
  }

  const genre = user.data.me.favoriteGenre
  const allBooks = res.data.allBooks
  const books = allBooks.filter((book) => book.genres.includes(genre))

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{genre}</b>
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
    </div>
  )
}

export default Recommended
