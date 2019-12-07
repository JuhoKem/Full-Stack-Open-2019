import React from 'react';
import ReactDOM from 'react-dom';



const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }
  
    return (
        <div>
            <Header otsikko={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
      )
  }

const Header = (props) => {
    //console.log("Header", props)
    return(
        <div>
            <h1>
                {props.otsikko}
            </h1>           
        </div>
    )
  }

const Content = (props) => {
    const pass = props.parts
    return(
        <div>
               <Part name = {pass[0].name} exercises={pass[0].exercises} />
               <Part name = {pass[1].name} exercises={pass[1].exercises} />
               <Part name = {pass[2].name} exercises={pass[2].exercises} />
      
        </div>
    )
}

const Total = (props) => {
    const pass = props.parts
    return (
        <div>
            <p>
                <b>Number of exercise {pass[0].exercises + pass[1].exercises + pass[2].exercises}</b>
            </p>
        </div>
    )
}

const Part = (props) => {
    return(
        <div>
            <p>
                {props.name} {props.exercises} 
            </p>            
        </div>
    )
}

  ReactDOM.render(<App />, document.getElementById('root'))

  