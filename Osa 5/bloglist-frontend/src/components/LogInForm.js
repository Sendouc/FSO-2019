import React from 'react'
const LogInForm = ({
  login,
  userName,
  password }) => (
  <div className='log'>
    <h2>log in to application</h2>
    <form onSubmit={login}>
      <div>
          username
        <input {...userName} />
      </div>
      <div>
          password
        <input {...password}/>
      </div>
      <button type="submit">log in</button>
    </form>
  </div>
)

export default LogInForm