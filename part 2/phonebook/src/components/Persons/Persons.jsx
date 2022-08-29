import React from "react";

const PersonList = ({ allPersons, deletePerson }) => {
  return (
    <div>
      {allPersons.map((person, i) => (
        <p className="persons" key={i}>
          {person.name} - <strong>{person.number}</strong>{" "}
          <button onClick={() => deletePerson(person.id, person.name)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default PersonList;
