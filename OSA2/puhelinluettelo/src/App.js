import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import PersonsToShow from './components/PersonsToShow'
import Filter from './components/Filter'
import Server from './services/server'
import Notification from './components/Notification'

// käynnistä npm run server ja npm start eri terminaaleissa

const App = () => {
    
const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ errorMessage, SetErrorMessage ] = useState(null)
  const [ errorColor, setErrorColor ] = useState('')

  const addRecod = (event) => {
    event.preventDefault() // estää sivua latautumasta - menettää kaikki tiedot, jos sivu latautuu

    if (persons.find(p => p.name === newName)) {

        // pop-up ikkuna
        if (window.confirm(`"${newName}" is already added to phonebook. Replace the old number with the new one?`)) {
          const person = persons.find(p => p.name === newName)
          const RecordObject = {
            name: newName,
            number: newNumber
        }
          // tietueen muokkaus
          //console.log('UPDATE ', RecordObject)
          Server
            .update(person.id, RecordObject)
            .then(response => {
              //console.log('responce:', response.data);
              //setPersons(persons.concat(response.data))
              setNewName('')
              setNewNumber('')
              setPersons(persons.map(p => p.id !== person.id ? p : response.data))
              SetErrorMessage(`"${person.name}" updated to phonebook`)
              setErrorColor('ok')
              setTimeout(() => {
                SetErrorMessage(null)}, 5000)
            })
            .catch(error => {
              console.log('ERROR');
              SetErrorMessage(`Information of "${person.name}" has already been removed from server`)
              setErrorColor('not ok')
              setTimeout(() => {
                SetErrorMessage(null)}, 5000)
                // olemattoman tietueen poisto
                setPersons(persons.filter(p => p.id !== person.id))
            })
        }
        setNewName('')
        setNewNumber('')
    } 
    else {
        const RecordObject = {
            name: newName,
            number: newNumber,
        }
        console.log('button cliked', event.target)
        setPersons(persons.concat(RecordObject))
        setNewName('')
        setNewNumber('')

        // tietueen lisäys
        Server
          .create(RecordObject)
          .then(response => { 
            //console.log('RECORD OBJECT', response);
            // asetetaan tilaan palvelimelta saatu data
            setPersons(persons.concat(response.data))
            SetErrorMessage(`"${RecordObject.name}" added to phonebook`)
            setErrorColor('ok')
            setTimeout(() => {
              SetErrorMessage(null)}, 5000)
          })
    }
  }
  // tietueen poisto
  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Want to delete "${person.name}"`)) {
      console.log('handleDelete, id:', id);
      Server
          .remove(id)
          .then(response => {
              //console.log('REMOVE RESPONCE -->', response)
              // otetaan kaikki paitsi negaation id mukaan
              setPersons(persons.filter(person => person.id !==id))
              SetErrorMessage(`"${person.name}" removed from phonebook`)
              setErrorColor('ok')
              setTimeout(() => {
                SetErrorMessage(null)}, 5000)
          })
    }
  }

  const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  useEffect (() => {
    console.log('effect')
    Server
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('renderöity', persons.length, 'kpl')
  
  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={errorMessage} type={errorColor}/>
        <Filter handleFilterChange={handleFilterChange}/>

      <h2>Add a new</h2>
        <PersonForm addRecod={addRecod} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <ul>
        <PersonsToShow handleDelete={handleDelete} persons={persons} setPersons={setPersons} filter={filter}/>
      </ul>
    </div>
  )
    // vaihtoehto, jos haluaa kaikkien nimet näkyville
    // {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
}

export default App


// tehty 2.6 - 2.10
//      2.11
//      2.15 - 2.18
//      2.19 - 2.20