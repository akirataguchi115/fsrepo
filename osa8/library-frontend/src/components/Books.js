import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const books = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('')
  if (!props.show) {
    return null
  }

  if (books.loading) return <div>loading...</div>

  return (
    <div>
      <h2>books</h2>
      {genre &&
      <p>in genre <b>{genre}</b></p>
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.data.allBooks.filter(book => genre ? book.genres
            .includes(genre) : book)
            .map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {Array.from(new Set(books.data.allBooks.flatMap(book => book.genres))).map(genre => <button onClick={() => setGenre(genre)}>{genre}</button>)}
    </div>
  )
}

export default Books