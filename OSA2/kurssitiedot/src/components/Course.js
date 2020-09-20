import React from 'react'

const Course = ({course}) => {
    //console.log('Course: ', course);
  
    return (
      <div>
        <Header name = {course.name}/>
        <Content parts = {course.parts}/>
        <Total parts = {course.parts}/>
      </div>
    )
  }
  
  const Header = ({name}) =><h1>{name}</h1>
  
  const Content = ({parts}) => {  
    //console.log("Content: ", {parts})
    const  courses = parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)
    return (
    <div>        
      {courses} 
    </div>
  )
  }
   
  const Part = ({name, exercises}) => {
    //console.log('Part: ', {name, exercises});
    return (
  <p>{name} {exercises}</p>
   )
  }
  
  const Total = ({parts}) => {
    //console.log('Total: ', parts);
    const total = parts.reduce((a, b) => a + b.exercises, 0)      // reduce
    return <p><b>Yhteensä {total} tehtävää</b></p>
  }  
export default Course