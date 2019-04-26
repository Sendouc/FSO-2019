import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr key="blogs created">
            <td>

            </td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>
          {users.map(u =>
            <tr key={u._id}>
              <td>
                <Link to={`/users/${u._id}`}>{u.name ? u.name : u.userName}</Link>
              </td>
              <td>
                {u.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users