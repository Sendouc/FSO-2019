import React from 'react'
import { Form, Button } from 'semantic-ui-react'
const LogInForm = ({
  login,
  userName,
  password }) => (
  <div className='log'>
    <h2>log in to application</h2>
    <Form onSubmit={login}>
      <div>
        <Form.Field>
          <label>username</label>
          <input {...userName} />
        </Form.Field>
      </div>
      <div>
        <Form.Field>
          <label>password</label>
          <input {...password}/>
        </Form.Field>
      </div>
      <Button type="submit">log in</Button>
    </Form>
  </div>
)

export default LogInForm