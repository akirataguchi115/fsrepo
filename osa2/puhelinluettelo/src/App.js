import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const PersonForm = (props) => {
    return (
        <>
            <form onSubmit={props.addName}>
                <div>
                    name: <input
                        value={props.newName}
                        onChange={props.handleNameChange} />
                </div>
                <div>
                    number: <input
                        value={props.newNumber}
                        onChange={props.handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

const Filter = (props) => {
    return (
        <>
            <form onSubmit={props.addName}>
                <div>
                    filter shown with   <input
                        value={props.newFilter}
                        onChange={props.handleFilterChange} />
                </div>
            </form>
        </>
    )
}

const Persons = (props) => {
    return (
        <>
            <div>
                {props.namesToShow.map((person, i) =>
                    <p key={person.name}>{person.name} {person.number}</p>
                )}
            </div>
        </>
    )
}

const App = () => {
    useEffect(() => {
        personService
            .getAll()
            .then(response => {
                setPersons(response)
            })
            .catch(error => {
                console.log('fail')
            })
    }, [])
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const addName = (event) => {
        event.preventDefault()
        const NameObject = {
            name: newName,
            number: newNumber,
            date: new Date().toISOString,
            id: persons.length + 1,
        }
        persons.map(x => x.name).includes(newName) ?
            window.alert(`${newName} is already added to phonebook`)
            : setPersons(persons.concat(NameObject))
        personService
            .create(NameObject)
            .then(response => {
                setPersons(persons.concat(response))
                setNewName('')
                setNewNumber('')
            })
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const namesToShow = persons.filter(person => person.name
        .toLowerCase()
        .includes(newFilter.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter addName={addName} newFilter={newFilter}
                handleFilterChange={handleFilterChange} />
            <h3>add a new</h3>
            <PersonForm addName={addName} newName={newName}
                handleNameChange={handleNameChange} newNumber={newNumber}
                handleNumberChange={handleNumberChange} />
            <h3>Numbers</h3>
            <Persons namesToShow={namesToShow} />
        </div>
    )
}

export default App