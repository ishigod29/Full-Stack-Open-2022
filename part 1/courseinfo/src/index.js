import React from "react";
import ReactDOM from "react-dom/client";

const Header = props => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = props => {
  return (
    <p>{props.part} {props.exercise}</p>
  )
}

const Content = props => {
  return (
    <>
    <Part part={props.parts[0].name} exercise={props.parts[0].exercises}/>
    <Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>
    <Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>
    </>
  )
}

const Total = props => {

  const total = props.parts[0].exercises +  props.parts[1].exercises + props.parts[2].exercises

  return (
    <p>Number of exercises {total} </p>
  )
}

const App = () => {

  const course =  'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
