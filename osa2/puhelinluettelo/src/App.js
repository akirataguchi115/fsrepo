import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '+358 404 3838'}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

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
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input
                        value={newName}
                        onChange={handleNameChange} />
                </div>
                <div>
                    number: <input
                        value={newNumber}
                        onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map((person, i) =>
                    <p key={person.name}>{person.name} {person.number}</p>
                )}
            </div>
        </div>
    )

}

export default App