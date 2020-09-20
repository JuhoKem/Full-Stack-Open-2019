import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
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

  // mappauksessa muistetta key-atribuutti. Jos id:tä ei ole, niin alla on esim.
  const oneCourseAtTime = courses.map((cs, i) => <Course key={i} course={cs} />)

  return (
    <div>
      {oneCourseAtTime}
    </div>
  )
}

ReactDOM.render(
  <App />, document.getElementById('root')
)


// 2.1 - 2.5