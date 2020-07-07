import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

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
                    <table key={person.id}>
                        <tbody >
                            <tr>
                                <td>
                                    <p key={person.name}>{person.name} {person.number}</p>
                                </td>
                                <td>
                                    <button onClick={event => props.removeName(event, person.id, person.name)}>delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="error">
            {message}
        </div>
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
    const [errorMessage, setErrorMessage] = useState('')

    const addName = (event) => {
        event.preventDefault()
        const NameObject = {
            name: newName,
            number: newNumber,
            date: new Date().toISOString,
            id: persons.length + 1,
        }
        if (persons.map(x => x.name).includes(newName)) {
            if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
                const person = persons.find(p => p.name === newName)
                const changedPerson = { ...person, number: newNumber }
                personService
                    .update(person.id, changedPerson).then(returnedPerson => {
                        setPersons(persons.map(p => p.id !== person.id ? p : changedPerson))
                        setErrorMessage(`Updated ${newName}`)
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                        setNewName('')
                        setNewNumber('')
                    })
                    .catch(error => {
                        alert(`Person ${person.id} was already deleted from server`)
                    })
            }
        } else {
            setPersons(persons.concat(NameObject))
            personService
                .create(NameObject)
                .then(response => {
                    setPersons(persons.concat(response))
                    setNewName('')
                    setNewNumber('')
                })
            setErrorMessage(`Added ${newName}`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const removeName = (event, id, name) => {
        event.preventDefault()
        if (window.confirm(`Delete ${name}?`)) {
            personService
                .remove(id)
                .then(response => {
                    setPersons(persons.filter((item => item.id !== id)))
                })
        }
        setErrorMessage(`Deleted ${name}`)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
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
            <Notification message={errorMessage} />
            <Filter addName={addName} newFilter={newFilter}
                handleFilterChange={handleFilterChange} />
            <h3>add a new</h3>
            <PersonForm addName={addName} newName={newName}
                handleNameChange={handleNameChange} newNumber={newNumber}
                handleNumberChange={handleNumberChange} />
            <h3>Numbers</h3>
            <Persons namesToShow={namesToShow} removeName={removeName} />
        </div>
    )
}

export default App