import React from "react";
import Persons from "../Persons/Persons";
import Detail from "../Detail/Detail";

const PersonsList = ({ singlePerson, allPersons, deletePerson }) => {
  return (
    <div>
      {singlePerson === "" ? (
        <Persons deletePerson={deletePerson} allPersons={allPersons} />
      ) : (
        <Detail deletePerson={deletePerson} singlePerson={singlePerson} />
      )}
    </div>
  );
};

export default PersonsList;
