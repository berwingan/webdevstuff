import { useState, useEffect } from "react";
import axios from "axios";


const Filter = ({ value, onChange }) => {
  return (
    <div>
      find countries
      <input value={value} onChange={onChange} />
    </div>
  );
};


const Display = ({ country,filter,setFilter }) => {
  return (
    <div>
      {country.name.common}
      <button onClick={()=>setFilter(country.name.common)}>show</button>
    </div>
  );
};

const DisplayIndividualCountry=({country})=>{
  const flagof= "Flag of " + country.name.common
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital} </p>
      <p>Area : {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(language=><li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={flagof}></img>
      <h2>Weather in {country.name.common}</h2>
      <p>temperature </p>
    </>
  );
}

const Countries = ({ countriesToShow,filter,setFilter }) => {
  if(countriesToShow.length>10){
    return(<p>Too many matches, specify another filter</p>)
  } 
  if(countriesToShow.length===1){
    return(<DisplayIndividualCountry country={countriesToShow[0]} />)
  }
  return (
    <>
      {countriesToShow.map((country)=><Display filter={filter}setFilter={setFilter}key={country.name.common}country={country}/>)}
    </>
  );
};




const App = () => {
  const [countries, setCountries] = useState([]);
  const [weather, setWether] = useState([]);
  const [filter, setFilter] = useState("");

  const hook = () => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  };
  useEffect(hook, []);
  
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };
  const countriesToShow = filter
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : countries;

  return (
    <div>
      <Filter value={filter} onChange={handleFilter} />
      <Countries filter={filter}setFilter={setFilter}countriesToShow={countriesToShow} />
    </div>
  );
};

export default App;
