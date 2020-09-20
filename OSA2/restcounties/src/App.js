import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Show from './components/Show'

// REACT_APP_API_KEY=.... npm start

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  // haetaan dataa palvelimelta
  useEffect(() => {
    //console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        //console.log('promise fullfilled');
        setCountries(response.data)
      })
  },[])
  //console.log('render', countries.length, 'kpl');

  // kontrolloitu tapahtumakäsittelijä inputtia varten 
  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value)
  }


  return (
      <form>
        <div>
          find countries <input onChange={handleFilterChange}/>
        </div>
        <Show countries={countries} filter={filter}/>
      </form>
  );
}
// {allCountries.map((c, i) => <h3 key={i}> Weather in {c.name} </h3>)}

export default App;

// tehtävät 2.12 ja 2.14