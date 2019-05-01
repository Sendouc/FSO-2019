import React, { useState } from 'react'

const LogIn = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (!props.show) {
    return null
  }

  if (props.token) {
    return <div>logged in</div>
  }

  const submit = async (e) => {
    e.preventDefault()
    const result = await props.login({
      variables: { username, password }
    })

    const token = result.data.login.value

    props.setToken(token)
    localStorage.setItem('user-token', token)
  }

  return (
    <div>
      <h3>log in</h3>
      <form onSubmit={submit}>
        username <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              /><br/>
        password <input
              value={password}
              type="password"
              onChange={({ target }) => setPassword(target.value)}
              /><br/>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default LogIn