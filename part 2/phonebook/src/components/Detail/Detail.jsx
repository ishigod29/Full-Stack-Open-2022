import React from "react";

const Detail = ({ singlePerson, deletePerson }) => {
  return (
    <div>
      {singlePerson.map((person, i) => (
        <p key={i}>
          {person.name} {person.number}{" "}
          <button onClick={() => deletePerson(person.id, person.name)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Detail;
