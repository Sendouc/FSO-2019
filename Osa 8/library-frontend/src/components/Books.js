import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useApolloClient } from 'react-apollo-hooks'

const BOOK_BY_GENRE = gql`
query allBooks($genre: String!) {
  allBooks(genre: $genre) {
    title
    author {
      name
    }
    published
    genres
  }
}
`

const ME = gql`
{
  me {
    favoriteGenre
  }
}
`

const Books = (props) => {
  const [genre, setGenre] = useState('all')
  const [genres, setGenres] = useState([])
  const [books, setBooks] = useState([])
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const result = useQuery(props.fetchQuery)
  const client = useApolloClient()

  const filterBooks = async (genre) => {
    try {
      const { data } = await client.query({
        query: BOOK_BY_GENRE,
        variables: { genre }
      })
      setBooks(data.allBooks)
    } catch (error) {
      console.log('error', error)
    }
  }

  const setFav = async () => {
    console.log('setting fav <3')
    try {
      const { data } = await client.query({
        query: ME
      })
      setFavoriteGenre(data.me.favoriteGenre)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    console.log('using effect')
    if (genre === 'all' && !result.loading) {
      setBooks(result.data.allBooks)
      if (genres.length === 0) {
        const genresWithDuplicates = books
        .reduce((acc, cur) => acc.concat(cur.genres), [])
        setGenres([...new Set(genresWithDuplicates)])
      }
      if (props.token) {
        setFav()
      }
      return
    }
    filterBooks(genre)
  }, [genre, genres, result, favoriteGenre, props.token, books])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  console.log('kirjaset', books)
  return (
    <div>
      <h2>books</h2>

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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <select value={genre} onChange={({ target }) => setGenre(target.value)}>
          <option value="all" key="all">all books</option>
          {genres.map(g => <option value={g} key={g}>{g !== favoriteGenre ? g : `${g} (favorite)`}</option>)}
        </select>
      </div>
    </div>
  )
}

export default Books