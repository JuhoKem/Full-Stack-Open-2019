import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const ButtonGood = ({handleClick}) => ( 
            <Button value={handleClick} text="good"/>      
    )

const ButtonNeutral = ({handleClick}) => (
            <Button value={handleClick} text="neutral"/>
    )
const ButtonBad = ({handleClick}) => (
            <Button value={handleClick} text="bad"/>
    )
const Button = ({value, text}) => {
    return (
            <button onClick={value}>{text}</button>
    )
}
const Statistics = ({good, neutral, bad, all}) => {     // propsit otetaan suoraan lauseeseen
    const change = (bad * -1)
    const avg = (change / all) + (good / all)
    const positive = (good / all) * 100
    if (all === 0)
        return <p>No feedback given yet</p>
    else
        return (
        
                <table>
                    <tbody>
                        <tr>
                            <td><Statistic text="good"/></td>
                            <td><Statistic value={good}/></td>
                        </tr>
                        <tr>
                            <td><Statistic text="neutral"/></td>
                            <td><Statistic value={neutral}/></td>
                        </tr>
                        <tr>
                            <td><Statistic text="bad"/></td>
                            <td><Statistic value={bad}/></td>
                        </tr>
                        <tr>
                            <td><Statistic text="all"/></td>
                            <td><Statistic value={all}/></td>
                        </tr>
                        <tr>
                            <td><Statistic text="average"/></td>
                            <td><Statistic value={avg}/></td>
                        </tr>
                        <tr>
                            <td><Statistic text="positive"/></td>
                            <td><Statistic value={positive} procent="%"/></td>
                        </tr>
                    </tbody>

                </table>
           
    )
}
const Statistic = ({text, value, procent}) => {   // nämä kaksi samanninmistä komponenntia sekoittivat pääni hyvin paljon
    return (                                      // olisi suotavaa vaihtaa niiden nimet ja muokata tehtävänantoa
        <div>
            {text} {value} {procent}
        </div>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const setToGood = (value) => {
      setGood(good+value)
      setAll(all+1)
  }
  const setToNeutral = (value) => {
    setNeutral(neutral+value)
    setAll(all+1)
}
const setToBad = (value) => {
    setBad(bad+value)
    setAll(all+1)
}
  return (
    <div>
        <h1>Give feedback</h1>
        <div>
            <ButtonGood handleClick={() => setToGood(1)}/>
            <ButtonNeutral handleClick={() => setToNeutral(1)}/>
            <ButtonBad handleClick={() => setToBad(1)}/>
        </div>
        <h1>Statistics</h1>
        <div>
            <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
        </div>

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)