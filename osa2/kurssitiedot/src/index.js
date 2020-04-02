import React from 'react'
import ReactDOM from 'react-dom'

const Total = (props) => {
    return (
        <b>total of {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} exercises</b>
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
            {props.parts.map(part => <Part name={part.name} ex={part.exercises} />)}
        </div>
    )
}

const Header = (props) => {
    return (
        <h1>{props.course.name}</h1>
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
const App = () => {
    const course = {
        name: 'Half Stack application development',
        id: 1,
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'))