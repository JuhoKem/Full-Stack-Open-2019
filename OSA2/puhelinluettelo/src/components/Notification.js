import React from 'react'

const Notification = ({message, type}) => {
    //console.log('ERROR type: ', type);
    if (message === null) {
      return null
    }
  
      // CSS
      const errorStyle = {
        // tässä valitaan virheilmoituksen väri
        color: type === 'ok' ? 'green' : 'red',
        background: 'rgb(236, 234, 234)',
        fontSize: 15,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      
      }
    return (
      <div style={errorStyle}>
        {message}
      </div>
    )
  }

export default Notification