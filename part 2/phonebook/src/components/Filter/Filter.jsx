import React from "react";

const Filter = ({ handleSearchPerson, search }) => {
  return (
    <form>
      filter shown with <input onChange={handleSearchPerson} value={search} />
    </form>
  );
};

export default Filter;
