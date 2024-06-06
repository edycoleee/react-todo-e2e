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
  const [todoToEdit, setTodoToEdit] = useState(null);

  //fungsi get todo dari data api ke state todos
  const fetchTodos = async () => {
    const todos = await getTodos();
    setTodos(todos);
  };

  //fungsi useEffect dijalankan saat awal loading
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SIMPAN BARU: ", text);
    //Todo Baru yang akan di simpan
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    }
    //fungsi simpan todo ke api
    await addTodo(newTodo);
    // Refresh todos after adding a new one
    fetchTodos();
    console.log("DATA TODOS : ", todos);
    setText('');
  };

  const handleDelete = async (id) => {
    // Fungsi delete ke api
    await deleteTodo(id);
    // Refresh todos after deleting one
    fetchTodos();
  };


  const handleEditTodo = async (updatedTodo) => {
    // update todo
    console.log("UPDATE TODO : ", updatedTodo);
    //Refreh get todo >> tampilkan hsil update
    //kembalikan state edit ke null
    setTodoToEdit(null);
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
            <button onClick={() => setTodoToEdit(todo)}>Edit</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

