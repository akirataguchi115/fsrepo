import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ changeBorn, result] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      console.log(JSON.stringify(error.networkError.result.errors[0].message))
    },
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  useEffect(() => {
    if ( result.data && !result.data.editAuthor) {
      console.log('name not found')
    }
  }, [result.data])

  if (authors.loading) return <div>loading...</div>

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    changeBorn({ variables: { name, setBornTo: born }})

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <input
          value={name}
          onChange={({ target }) => setName(target.value)}/>
        </div>
        <div>
          born
          <input
          value={born}
          onChange={({ target }) => setBorn(parseInt(target.value))}/>
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors