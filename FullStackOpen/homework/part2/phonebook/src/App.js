import { useState, useEffect } from "react";
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from "axios"; 

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number:"040-1234567",id:1 }]);
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  const hook = () => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  };
  useEffect(hook, []);



  const addPerson=(event)=>{
    event.preventDefault()
    const newPerson={
      name:newName,
      number:newNumber,
      id:persons.length+1,
    }
    const checknamearr = persons.map(person=> (JSON.stringify(person)===JSON.stringify(newPerson)))
    const newpersonbool = checknamearr.reduce((s,p)=>s+p,0)
    if(newpersonbool){
      console.log("same person")
      window.alert(newName+ "is already added to phonebook")
    }else{
      console.log("different person")
      setPersons(persons.concat(newPerson));
    }
    setNewName("");
    setNewNumber("");
  }
  const handleNewName=(event)=>{
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  }
    const handleFilter = (event) => {
    setFilter(event.target.value);
  }
  const peopleToShow = filter
    ? persons.filter(person=>person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilter}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName}handleNewName={handleNewName}handleNewNumber={handleNewNumber}newNumber={newNumber} />

      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow}/>
    </div>
  );
};

export default App;
