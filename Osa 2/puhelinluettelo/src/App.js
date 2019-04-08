import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Error from './components/Error'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ error, setError ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const person = {name: newName, number: newNumber}
    if (persons.some(p => p.name === person.name)) {
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const personToUpdate = persons.find(personInArray => personInArray.name === newName)
        personService
          .update(personToUpdate.id, person)
          .then(returnedPerson => {
              setPersons(persons.map(personInArray => personInArray.id !== personToUpdate.id ? personInArray : returnedPerson))
              setNotification(`Henkilön ${personToUpdate.name} tiedot päivitetty`)
              setTimeout(() => {
                setNotification(null)
              }, 5000)
          })
          .catch(error => {
            setPersons(persons.filter(p => p.id !== personToUpdate.id))
            setError(`Henkilö ${person.name} poisto palvelimelta epäonnistui`)
            setTimeout(() => {
              setError(null)
            }, 5000)
          })
      }
      return
    }
    personService
      .create(person)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setNotification(`${addedPerson.name} lisätty`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
    
  }

  const removePerson = (person) => {
    if(window.confirm(`Poistetaanko ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(response => {
          const filteredArray = persons.filter(personInArray => personInArray.id !== person.id)
          setPersons(filteredArray)
          setNotification(`Henkilö ${person.name} poistettu onnistuneesti`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setPersons(persons.filter(p => p.id !== person.id))
          setError(`Henkilö ${person.name} poisto palvelimelta epäonnistui`)
          setTimeout(() => {
            setError(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  return (
    <div>
      <Notification message={notification} />
      <Error message={error} />
      <h2>Puhelinluettelo</h2>
      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange}/>
      <h4>lisää uusi</h4>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h4>Numerot</h4>
      <Numbers persons={persons} nameFilter={nameFilter} removePerson={removePerson}/>
    </div>
  )

}

export default App
