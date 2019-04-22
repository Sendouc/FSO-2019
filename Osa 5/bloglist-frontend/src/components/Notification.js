import React from 'react'

const Notification = ({ message }) => {
    const notificationStyle = {
        color: 'black',
        background: 'lightblue',
        fontSize: '15px',
        borderStyle: 'solid',
        borderRadius: '1px',
        padding: '10px',
        marginBottom: '10px'
    }

    if (!message) {
        return null
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification