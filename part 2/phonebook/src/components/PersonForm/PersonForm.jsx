import React from "react";

const PersonForm = ({
  addPerson,
  handleNumberChange,
  handlePersonChange,
  newNumber,
  newName,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input onChange={handlePersonChange} value={newName} required />
        <br />
        number:
        <input onChange={handleNumberChange} value={newNumber} required />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
