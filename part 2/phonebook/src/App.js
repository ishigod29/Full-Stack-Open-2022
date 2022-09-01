import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm/PersonForm";
import PersonsList from "./components/PersonsList/PersonsList";
import Filter from "./components/Filter/Filter";
import personsService from "./services/persons";
import Notification from "./components/Notification/Notification";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

const App = () => {
  const [allPersons, setAllPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [singlePerson, setSinglePerson] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setAllPersons(initialPersons);
    });
  }, []);

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personsService
        .remove(id)
        .then((result) => {
          console.log(result)
          setAllPersons(allPersons.filter(person => person.id !== id ))
          setMessage(`${name} is deleted`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch(() => {
          setError(
            `Information of ${name} has alredy been removed from server`
          );
          setTimeout(() => {
            setError(null);
          }, 5000);
        });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const person = allPersons.find((person) => person.name === newName);

    if (person !== undefined) {
      if (
        window.confirm(
          `${newName} is alredy added to phonebook, replace the old number with a new one?`
        )
      ) {
        personsService
          .update(person.id, personObject)
          .then((returnedPerson) => {
            setAllPersons(allPersons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setMessage(`Information of ${person.name} is update`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch(() => {
            setError(
              `Information of ${person.name} has alredy been removed from server`
            );
            setTimeout(() => {
              setError(null);
            }, 5000);
          });
      }
      setNewName("");
      setNewNumber("");
    } else {
      personsService
        .create(personObject)
        .then((returnedPerson) => {
          setAllPersons([...allPersons, returnedPerson]);
          setMessage(`Added ${newName}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setError(error.request.response);
          setTimeout(() => {
            setError(null);
          }, 5000);
        });
      setNewName("");
      setNewNumber("");
    }
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchPerson = (event) => {
    setSearch(event.target.value);
    const filter = allPersons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );
    setSinglePerson(filter);

    if (event.target.value.length === 0) {
      setSinglePerson(allPersons);
    } else {
      setSinglePerson(filter);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      {error !== null ? <ErrorMessage error={error} /> : ""}

      {message !== null ? <Notification message={message} /> : ""}

      <Filter handleSearchPerson={handleSearchPerson} search={search} />

      <h2>Add a new</h2>

      <PersonForm
        addPerson={addPerson}
        handleNumberChange={handleNumberChange}
        handlePersonChange={handlePersonChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>

      <PersonsList
        deletePerson={deletePerson}
        singlePerson={singlePerson}
        allPersons={allPersons}
      />
    </div>
  );
};

export default App;
