import React from 'react'

const numbers = (persons, nameFilter, removePerson) => {
    const filteredPersons = persons.filter(person => nameFilter === '' || person.name.toLowerCase().includes(nameFilter.toLowerCase()))
    if (filteredPersons.length === 0) {
      return 'rajauksella ei löytynyt henkilöitä'
    }
    return filteredPersons.map(person => <Person key={person.name} person={person} removePerson={removePerson}/>)
  }

const Person = ( {person, removePerson} ) => {
return (
    <li>{person.name} {person.number} <button onClick={() => removePerson(person)}>poista</button></li>
    )
}

const Numbers = ( {persons, nameFilter, removePerson} ) => {
    return (
        <>
            {numbers(persons, nameFilter, removePerson)}
        </>
    )
}

export default Numbers