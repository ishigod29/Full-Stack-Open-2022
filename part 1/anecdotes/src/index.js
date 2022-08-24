import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const BestAnecdote = ({ anecdotes, votes }) => {
  const maxVoteCount = Math.max(...votes);
  const bestIndex = votes.indexOf(maxVoteCount);
  const best = anecdotes[bestIndex];

  if (maxVoteCount === 0) {
    return <p>no votes!</p>;
  }

  return (
    <>
      <p>{best}</p>
      <p>has {maxVoteCount}</p>
    </>
  );
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0]);

  const handleAnecdote = () => {
    const numArray = Math.floor(Math.random() * anecdotes.length);
    setSelected(numArray);
  };

  const handleVotes = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      <Button handleClick={handleVotes} text="vote" />
      <Button handleClick={handleAnecdote} text="next anectote" />
      <h1>Anecdote with most votes</h1>
      <BestAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>
);
