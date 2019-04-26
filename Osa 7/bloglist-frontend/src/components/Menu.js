import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../reducers/userReducer'
import { Button, Icon } from 'semantic-ui-react'

const Menu = (props) => {
  const menuStyle = {
    color: 'black',
    background: 'grey',
    fontSize: '15px',
    padding: '5px',
    marginBottom: '5px'
  }

  const linkStyle = {
    paddingRight: '10px',
    color: 'black'
  }

  return (
    <div style={menuStyle}>
      <p>
        <Link to='/blogs' style={linkStyle}><Icon name='book' size='large' /></Link>
        <Link to='/users' style={linkStyle}><Icon name='address book' size='large' /></Link>
        {props.user.name ? props.user.name : props.user.userName} logged in
        <Button onClick={() => props.logOut()}>log out</Button>
      </p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { logOut })(Menu)