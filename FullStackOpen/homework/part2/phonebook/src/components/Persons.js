

const Display = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const Persons = ({ peopleToShow }) => {
  return (
    <>
      {peopleToShow.map((person) => (
        <Display key={person.id} person={person} />
      ))}
    </>
  );
};

export default Persons;