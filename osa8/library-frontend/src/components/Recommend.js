import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, LOGGEDIN_USER } from '../queries'

const Recommend = (props) => {
  const books = useQuery(ALL_BOOKS)
  const currentuser = useQuery(LOGGEDIN_USER)
  const [genre, setGenre] = useState('') 

  useEffect(() => {
    console.log(currentuser.data)
    if (currentuser.data) if (currentuser.data.me) setGenre(currentuser.data.me.favorite)
  }, [currentuser])
  if (!props.show) {
    return null
  }

  if (books.loading) return <div>loading...</div>

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{genre}</b></p>
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

export default Recommend