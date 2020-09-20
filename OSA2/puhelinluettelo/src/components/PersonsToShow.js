import React from 'react'

const PersonsToShow = ({persons, filter, handleDelete}) => {
    const showNames = persons.filter(person => person.name.toLowerCase().includes(filter))

    // handleDelete palauttaa id:n Appiin
    return (showNames.map(person => 
        <div key={person.name}>{person.name} {person.number} <button onClick={() => handleDelete(person.id)} >delete</button> </div>)
    )
}

export default PersonsToShow