import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ( {countryFilter, handleFilterChange} ) => {
  return (
    <>
      find countries <input value={countryFilter} onChange={handleFilterChange} />
    </>
  )
}

const Country = ( {country} ) => {

  const [ weatherInfo, setWeatherInfo ] = useState([])

  useEffect(() => {
    axios
      .get(`http://api.apixu.com/v1/current.json?key=fa8757e7a3cf4684ac6145950190704&q=${country.capital}`)
      .then(response => {
        setWeatherInfo(response.data)
      })
  }, [])
  if (weatherInfo.length === 0) {
    return (
      <>loading data...</>
    )
  }
  return (
    <div>
    <h2>{country.name}</h2>
      <div>
        <li>capital {country.capital}</li>
        <li>population {country.population}</li>
      </div>
      <div>
        <h4>languages</h4>
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
      </div>
      <div>
        <img
          alt='flag of the country' 
          src={country.flag}
          />
      </div>
      <div>
        <h4>Weather in {country.capital}</h4>
        <li><b>temperature:</b> {weatherInfo.current.temp_c} Celsius</li>
        <img alt='icon that shows the kind of weather it is' src={weatherInfo.current.condition.icon} />
        <li><b>wind:</b> {weatherInfo.current.wind_kph} kph direction {weatherInfo.current.wind_dir}</li>
      </div>
    </div>
  )
}

const CountryButtonList = ( {countries, setFilter} ) => {
  return (
    countries.map(country => <CountryButton key={country.name} name={country.name} setFilter={setFilter}/>)
  )
}

const CountryButton = ( {name, setFilter} ) => {
  return (
    <li>{name} <button onClick={() => setFilter(name)} >show</button></li>
  )
}

const filteredCountries = (countryFilter, countries, setFilter) => {
  const filteredCountries = countries.filter(country => countryFilter === '' || country.name.toLowerCase().includes(countryFilter.toLowerCase()))
  if (countryFilter === '') {
    return 'Search for countries by starting to enter a name!'
  }
  if (filteredCountries.length === 0) {
    return 'No matches found'
  } else if (filteredCountries.length > 10) {
    return 'Too many matches, specify another filter'
  } else if (filteredCountries.length > 1) {
    return <CountryButtonList countries={filteredCountries} setFilter={setFilter}/>
  }

  return <Country country={filteredCountries[0]} />
}

const App = () => {
  const [ countryFilter, setFilter ] = useState('')
  const [ countries, setCountries ] = useState([])
  /*
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} on jo luettelossa`)
      return
    }
    setPersons(persons.concat({name: newName, number: newNumber}))
    setNewName('')
    setNewNumber('')
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

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  */

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <div>
        <Filter countryFilter={countryFilter} handleFilterChange={handleFilterChange}/>
      </div>
      <div>
        {filteredCountries(countryFilter, countries, setFilter)}
      </div>
    </div>
  )

}

export default App
