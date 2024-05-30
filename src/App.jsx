// src/App.jsx
import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { getTodos, saveTodos } from './api';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoToEdit, setTodoToEdit] = useState(null);

  useEffect(() => {
    setTodos(getTodos());
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const editTodo = (updatedTodo) => {
    setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
    setTodoToEdit(null);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo App - REACTJS - LOCAL STORAGE</h1>
      <TodoForm addTodo={addTodo} editTodo={editTodo} todoToEdit={todoToEdit} />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        setTodoToEdit={setTodoToEdit}
      />
    </div>
  );
};

export default App;
