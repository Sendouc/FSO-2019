import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation, useApolloClient } from 'react-apollo-hooks'
 

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import UpdateBook from './components/UpdateBook'
import LogIn from './components/LogIn'

const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks {
    title
    author {
      name
    }
    published
    genres
  }
}
`

const NEW_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
    published
    author {
      name
    }
    genres
    id
  }
}
`

const EDIT_BORN = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name, 
    setBornTo: $setBornTo
    ) {
      name
      born
    }
}
`

const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const handleError = (error) => {
    console.log('virhe', error)
  }
  
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const newBook = useMutation(NEW_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })
  
  const editBorn = useMutation(EDIT_BORN, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  const login = useMutation(LOGIN, {
    onError: handleError
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        {token ? <button onClick={() => setPage('update')}>update author</button> : null}
        {token 
          ? 
          <button onClick={() => logout()}>logout</button> 
          : 
          <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors
        show={page === 'authors'}
        fetchQuery={ALL_AUTHORS}
      />

      <Books
        show={page === 'books'}
        fetchQuery={ALL_BOOKS}
        token={token}
      />

      <NewBook
        show={page === 'add'}
        bookQuery={ALL_BOOKS}
        authorQuery={ALL_AUTHORS}
        newBook={newBook}
      />

      <UpdateBook
        show={page === 'update'}
        fetchQuery={ALL_AUTHORS}
        editAuthor={editBorn}
        token={token}
      />

      <LogIn
        show={page === 'login'}
        login={login}
        token={token}
        setToken={setToken}
      />

    </div>
  )
}

export default App
