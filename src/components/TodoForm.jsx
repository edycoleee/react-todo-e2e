// src/components/TodoForm.jsx
import { useState, useEffect } from 'react';

const TodoForm = ({ addTodo, editTodo, todoToEdit }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (todoToEdit) {
      setText(todoToEdit.text);
    }
  }, [todoToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoToEdit) {
      editTodo({ ...todoToEdit, text });
    } else {
      addTodo({
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

export default TodoForm;
