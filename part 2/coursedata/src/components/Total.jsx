import React from "react";

const Total = ({ parts }) => {
  const initial = 0;
  const total = parts.reduce((s, p) => s + p.exercises, initial);

  return <strong>total of {total} exercises</strong>;
};

export default Total;
