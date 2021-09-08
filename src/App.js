import React, { useState } from "react";
import './App.css';

function App() {

  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();

    if (newTodo.length === 0){
      return;
    }

    const todoItem = {
      text: newTodo,
      complete: false
    };

    setTodos([...todos, todoItem]);
    setNewTodo("");
  };

  const handleTodoDelete = (delIdx) => {
    const filteredTodos = todos.filter((todo, idx) => {
      return idx !== delIdx;
    });

    setTodos(filteredTodos);
  }

  const handleTodoToggle = (idx) => {
    const updatedTodos = todos.map((todo, i) => {
      if (idx == i){
        todo.complete = !todo.complete;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  return (
    <div className="App">
      <form onSubmit={(event) => {
        handleNewTodoSubmit(event);
      }}>
        <input onChange={(event) => { setNewTodo(event.target.value); }} type="text" value={newTodo} />
        <div>
          <button>Add</button>
        </div>
      </form>

      {
        todos.map((todo, idx) => {
          const todoClasses = ["bold", "italic"];

          if(todo.complete == true) {
            todoClasses.push("strike");
          }

          return <div key={idx}>
            <input onChange={(event)=>{handleTodoToggle(idx);}} checked={todo.complete} type="checkbox"  />
            <span className={todoClasses.join(" ")}>{todo.text}</span>
            <button style={{marginLeft: "5px"}}onClick={(event)=>{handleTodoDelete(idx);}}>Delete</button>
          </div>
        })
      }

    </div>
  );
}

export default App;
