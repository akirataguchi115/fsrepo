import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
    return (
        <>
            find countries<input
                value={props.newFilter}
                onChange={props.handleFilterChange} />
        </>
    )
}

const Countries = (props) => {
    if (props.countriesToShow.length === 1) {
        const result = props.countriesToShow[0]
        return (
            <>
                <h1>{result.name}</h1>
                <p>Capital {result.capital}</p>
                <p>population {result.population}</p>
                <h2>languages</h2>
                <ul>
                    {result.languages.map((language, i) =>
                        <li key={language.name}>{language.name}</li>
                    )}
                </ul>
                <img src={result.flag} alt="flag of the country" width="500" height="300" />
            </>
        )
    } else if (props.countriesToShow.length < 10) {
        return (
            <table>
                {props.countriesToShow.map((country, i) =>
                    <tr>
                        <td>
                            <p key={country.name}>{country.name}</p>
                        </td>
                        <td>
                            <form onSubmit={() => props.setNewFilter(country.name)}>
                                <button type="submit">show</button>
                            </form>
                        </td>
                    </tr>
                )}
            </table>
        )
    } else {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
}

const App = () => {
    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])
    const [countries, setCountries] = useState([])
    const [newFilter, setNewFilter] = useState('')

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const countriesToShow = countries.filter(country => country.name
        .toLowerCase()
        .includes(newFilter.toLowerCase()))

    return (
        <div>
            <Filter newFilter={newFilter}
                handleFilterChange={handleFilterChange} />
            <Countries countriesToShow={countriesToShow} setNewFilter={setNewFilter} />
        </div>
    )
}

export default App