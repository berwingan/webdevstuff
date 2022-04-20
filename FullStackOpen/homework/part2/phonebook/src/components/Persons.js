const Display = ({ person,deleteFunction }) => {
  return (
    <p>
      {person.name} {person.number} <button onClick={deleteFunction}>delete</button>
    </p>
  );
};

const Persons = ({ peopleToShow, deleteUser }) => {
  return (
    <>
      {peopleToShow.map((person) => (
        <Display
          key={person.id}
          person={person}
          deleteFunction={() => deleteUser(person)}
        />
      ))}
    </>
  );
};

export default Persons;
