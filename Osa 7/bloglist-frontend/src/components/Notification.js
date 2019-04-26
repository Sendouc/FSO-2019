import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notificationStyle = {
    color: 'black',
    background: 'lightblue',
    fontSize: '15px',
    borderStyle: 'solid',
    borderRadius: '1px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (!props.notification) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)