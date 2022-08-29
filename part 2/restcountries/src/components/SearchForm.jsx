import React from "react";

const SearchForm = ({ newSearch, handleSearchChange }) => {
  return (
    <form>
      find countries <input value={newSearch} onChange={handleSearchChange} />
    </form>
  );
};

export default SearchForm;
