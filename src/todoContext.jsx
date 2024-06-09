// src/todoContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from './api.js';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const cobaVariable = "COBA CONTEXT"

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

  const handleAddTodo = async (todo) => {
    await addTodo(todo);
    // Refresh todos after adding a new one
    fetchTodos();
    console.log("DATA TODOS : ", todos);
  };

  const handleDelete = async (id) => {
    // Fungsi delete ke api
    await deleteTodo(id);
    // Refresh todos after deleting one
    fetchTodos();
  };


  // up.5. update todo
  const handleEditTodo = async (updatedTodo) => {
    console.log("UPDATE TODO : ", updatedTodo);
    await updateTodo(updatedTodo);
    //Refreh get todo >> tampilkan hsil update
    fetchTodos();
    //kembalikan state edit ke null
    setTodoToEdit(null);
  };

  const handleToggleComplete = async (id) => {
    // map mencari todo .id >> completed = !completed
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    //update state todos
    setTodos(updatedTodos);
    // find cari todo yg akan diupdate >> id
    const todoToUpdate = updatedTodos.find(todo => todo.id === id);
    //update todo
    await updateTodo(todoToUpdate);
  };

  return (
    <TodoContext.Provider
      value={{
        cobaVariable,
        todos,
        todoToEdit,
        handleAddTodo,
        handleDelete,
        handleEditTodo,
        handleToggleComplete,
        setTodoToEdit,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);