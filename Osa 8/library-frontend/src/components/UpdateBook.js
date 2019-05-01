import React, { useState } from 'react'
import { useQuery } from 'react-apollo-hooks' 

const UpdateBook = (props) => {
  const [born, setBorn] = useState('')
  const [name, setName] = useState('')
  const result = useQuery(props.fetchQuery)
  
  if (!props.show) {
    return null
  }

  if (!props.token) {
    return <div>log in to use this page</div>
  }

  const submit = async (e) => {
    e.preventDefault()
    if (name.length === 0) {
      return
    }
    await props.editAuthor({
      variables: { name, setBornTo: parseInt(born) }
    })

    setBorn('')
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  
  const authors = result.data.allAuthors

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map(a => <option value={a.name} key={a.name}>{a.name}</option>)}
        </select><br />
        born <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            /><br />
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default UpdateBook