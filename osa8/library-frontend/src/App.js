import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED } from './queries'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('books')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ onSubscriptionData }) => {
      window.alert('book added')
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button style={{ display: token ? '' : 'none' }} onClick={() => setPage('add')}>add book</button>
        <button style={{ display: token ? 'none' : '' }} onClick={() => setPage('login')}>login</button>
        <button style={{ display: token ? '' : 'none' }} onClick={() => setPage('recommend')}>recommend</button>
        <button style={{ display: token ? '' : 'none' }} onClick={logout}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommend
        show={page === 'recommend'}
      />

      <LoginForm setError={notify} setToken={setToken} setPage={setPage}
        show={page === 'login'}
      />

    </div >
  )
}

export default App