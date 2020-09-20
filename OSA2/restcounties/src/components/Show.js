import React from 'react'
import Weather from './Weather';

const Show = ({countries, filter}) => {
    // otetaan talteen kaikki maat ja muunnetaan pieneksksi kirjaimeksi
    const allCountries = countries.filter((c) => c.name.toLowerCase().includes(filter))
    // sisältää kaikki maat, jotka vastaavat filtteröinti ehtoa
    const toShow = (allCountries.map(c => <div key={c.name}>{c.name}</div>))

    console.log('ToShow sisältää: ', allCountries.map(c => c.name));

    const oneCountry = ({c}) => {
        //console.log('oneCountry props on', c);
        return(
            <div>
                <h1>{c.name}</h1>
                <p>Capital: {c.capital}</p>
                <p>Population: {c.population}</p>
                <h3>Languages:</h3>
                <ul>
                    {c.languages.map((lang, i) => (
                        <li key={i}>{lang.name}</li>
                    ))}
                </ul>
                    <img src={c.flag} alt={c.name} width='200' height='100'></img>

                    <Weather country={allCountries.map(c => c.name)}/>
            </div>
            
                )
    }
    
    if (filter.length === 0) {
      return null
    }  
    else if (toShow.length > 10) {
      return (
        <div>Too many matches. Be more specific</div>
      )
    }
    else if (toShow.length > 1) {
        //console.log('2-10');
      return(
      allCountries.map((c, i) => <div key={i}> {c.name} </div>
        
        ) 
      )
    }
    else if (toShow.length === 1) {
        //console.log('elsessa');
        //return(oneCountry())
    return allCountries.map((c, i) => <div key={i}>{oneCountry({c})} </div>)
        
      }
    else {
        return(
            null
        )
    }
  }

export default Show