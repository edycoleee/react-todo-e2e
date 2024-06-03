// src/App.jsx
import { useState, useEffect } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from './api.js';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoToEdit, setTodoToEdit] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (todo) => {
    await addTodo(todo);
    const fetchedTodos = await getTodos();
    setTodos(fetchedTodos);
  };

  const handleEditTodo = async (updatedTodo) => {
    await updateTodo(updatedTodo);
    const fetchedTodos = await getTodos();
    setTodos(fetchedTodos);
    setTodoToEdit(null);
  };

  const handleToggleComplete = async (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    const todoToUpdate = updatedTodos.find(todo => todo.id === id);
    await updateTodo(todoToUpdate);
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    const fetchedTodos = await getTodos();
    setTodos(fetchedTodos);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm addTodo={handleAddTodo} editTodo={handleEditTodo} todoToEdit={todoToEdit} />
      <TodoList
        todos={todos}
        toggleComplete={handleToggleComplete}
        deleteTodo={handleDeleteTodo}
        setTodoToEdit={setTodoToEdit}
      />
    </div>
  );
};

export default App;

const TodoList = ({ todos, toggleComplete, deleteTodo, setTodoToEdit }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          setTodoToEdit={setTodoToEdit}
        />
      ))}
    </div>
  );
};

const TodoItem = ({ todo, toggleComplete, deleteTodo, setTodoToEdit }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={() => setTodoToEdit(todo)}>Edit</button>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
};

const TodoForm = ({ addTodo, editTodo, todoToEdit }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (todoToEdit) {
      setText(todoToEdit.text);
    } else {
      setText('');
    }
  }, [todoToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (todoToEdit) {
      await editTodo({ ...todoToEdit, text });
    } else {
      await addTodo({
        id: Date.now(),
        text,
        completed: false,
      });
    }
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};
