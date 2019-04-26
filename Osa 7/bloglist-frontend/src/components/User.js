import React from 'react'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name ? user.name : user.userName}</h2>
      <p><b>added blogs</b></p>
      {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
    </div>
  )
}

export default User