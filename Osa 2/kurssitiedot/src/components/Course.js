import React from 'react'

const Course = ( {course} ) => {
    return (
      <>
        <Header course={course['name']} />
        <Content parts={course['parts']} />
        <Total parts={course['parts']} />
      </>
    )

    
}

const Header = ( {course} ) => {
    return (
        <h1>{course}</h1>
    )
}

const Content = ( {parts} ) => {
    const rows = () => {
        return parts.map(part => <div key={part['id']}><Part name={part['name']} exercises={part['exercises']} /></div>)
    }
    return (
        <div>
            {rows()}
        </div>
    )
}

const Part = (props) => {
    return (
        <p>{props.name} {props.exercises}</p>
    )
}

const Total = ( {parts} ) => {
    const total = parts.reduce( (a, c) =>  a + c['exercises'], 0)
    return (
        <p>yhteensä {total} tehtävää</p>
    )
}

export default Course