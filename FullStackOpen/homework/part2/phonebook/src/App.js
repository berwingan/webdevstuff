import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import interaction from "./services/interaction";


const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567", id: 1 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const hook = () => {
    console.log("effect");
    interaction.getAll().then((peopleOnBook) => {
      console.log("promise fulfilled");
      setPersons(peopleOnBook);
    });
  };
  useEffect(hook, []);
  const deleteUser = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      interaction
        .deleteDetails(personToDelete.id)
        .then(() =>
          console.log(`${personToDelete.name} details have been deleted`)
        );
      setPersons(persons.filter((person) => person.id !== personToDelete.id));
      console.log("people are gone");
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const checknamearr = persons.map(
      (person) => person.name === newPerson.name
    );
    console.log(checknamearr);
    const newpersonbool = checknamearr.reduce((s, p) => s + p, 0);
    if (newpersonbool) {
      const findid = persons.map((person) =>
        person.name === newPerson.name ? person.id : 0
      );
      const updateid = findid.reduce((s, p) => s + p, 0);
      // interaction.update(updateid,)
      console.log(`same person with id ${updateid}`);
      if (
        window.confirm(
          newName +
            "is already added to phonebook, replace the old number with a new one ?"
        )
      ) {
        const olddetails = persons.find((n) => n.id === updateid);
        const newdetails = { ...olddetails, number: newNumber };
        interaction.update(updateid, newdetails).then((returnedDetails) => {
          setPersons(
            persons.map((person) =>
              person.id !== newdetails.id ? person : newdetails
            )
          );
        });
      }
    } else {
      console.log("different person");
      interaction.create(newPerson).then((returnPerson) => {
        setPersons(persons.concat(returnPerson));
      });
    }
    setNewName("");
    setNewNumber("");
  };
  const handleNewName = (event) => {
    setNewName(event.target.value);
  };
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };
  const peopleToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow} deleteUser={deleteUser} />
    </div>
  );
};

export default App;
