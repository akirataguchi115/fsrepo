import React from 'react'
import ReactDOM from 'react-dom'

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
const App = () => {
    const courses = [
        {
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
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course => <Course course={course} />)}
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'))