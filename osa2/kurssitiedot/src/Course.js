import React from 'react'

const Total = (props) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const total = props.parts.map(x => x.exercises).reduce(reducer)
    return (
        <b>total of {total} exercises</b>
    )
}

const Part = (props) => {
    return (
        <p>{props.name} {props.ex}</p>
    )
}

const Content = (props) => {
    return (
        <div>
            {props.parts.map(part => <Part key={part.id} name={part.name} ex={part.exercises} />)}
        </div>
    )
}

const Header = (props) => {
    return (
        <h2>{props.course.name}</h2>
    )
}

const Course = (props) => {
    return (
        <div>
            <Header course={props.course} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    )
}

export default Course