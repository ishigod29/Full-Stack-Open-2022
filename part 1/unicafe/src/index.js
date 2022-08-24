import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const Button = ({ text, handleClick }) => {
  return (
    <button value={text} onClick={handleClick}>
      {text}
    </button>
  );
};

const Statistics = ({ value }) => {
  const [good, neutral, bad] = value;
  const total = good + neutral + bad;
  const average = good * 1 + (bad * -1) / total;
  const positive = good * (100 / total);

  if (total === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={total} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
};

const Statistic = ({ text, value }) => {
  if (text === "positive") {
    return (
      <tr>
        <td>
          {text} {value} %
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>
        {text} {value}
      </td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (e) => {
    const value = e.target.value;
    switch (value) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
      default:
        console.error("Sorry");
        break;
    }
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClick} text="good" />
      <Button handleClick={handleClick} text="neutral" />
      <Button handleClick={handleClick} text="bad" />

      <h1>statistics</h1>
      <Statistics value={[good, neutral, bad]} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
