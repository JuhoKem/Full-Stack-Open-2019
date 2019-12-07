import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const NextBtn = ({klikataan}) => {
    //console.log("next")
    return (
        <button onClick={klikataan}>Next one</button>
    )
}

const VoteBtn = ({klikataan1}) => {
    //console.log("vote")
    return (
        <button onClick={klikataan1}>Vote</button>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)

  const setToSelected = (value) => {
    //console.log(selected)             // printtaa arvotun numeron
    setSelected(value)                  // välittää arvotun numeron
  }
  const setToArray = (value) => {       // äänestys toimii, mutta äänten lukumäärä nollantuu joka kierroksella
    array[selected] +=value
    console.log("Äänestetty", selected)
    console.log(array)
  }

  const array = [0,0,0,0,0,0,0,0,0,0,0]

  return (
    <div>
        <h1>Anecdote of the day</h1>
        <p>{props.anecdotes[selected]}</p>
        <p>it has {array[selected]} vote(s)</p>
        <VoteBtn klikataan1={() => setToArray(1)}/>
        <NextBtn klikataan={() => setToSelected(Math.floor(Math.random() * 9))}/>  
        <h1>Anecdote with most votes</h1> 
    </div>
  )
}
//const array = {0:0,1:0,2:0,3:0,4:0,5:0}     // tänne lisätään mietteiden lukumäärää

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'How does a project get to be a year late?... One day at a time.',
  'Plan to throw one (implementation) away; you will, anyhow.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Program testing can be used to show the presence of bugs, but never to show their absence!'
]

ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
)

/*

  


  */