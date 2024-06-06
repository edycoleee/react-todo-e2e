// src/App.jsx
import { useState, useEffect } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from './api.js';

const todosAwal = [
  { id: 1717643328993, text: 'Todo 1', completed: false },
  { id: 1717643332412, text: 'Todo 2', completed: false }
]
const App = () => {

  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SIMPAN BARU: ", text);
    const todo = {
      id: Date.now(),
      text,
      completed: false,
    }
    setTodos([...todos, todo] )
    console.log("DATA TODOS : ", todos);
    setText('');
  };

  return (
    <div>
      {/* 1. TODO HEADER */}
      <h1>Todo App</h1>
      {/* 2. TODO FORM */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Submit</button>
      </form>
      {/* 3. TODO LIST */}
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            {/* 4. TODO ITEM */}
            <input
              type="checkbox"
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button >Edit</button>
            <button >Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

