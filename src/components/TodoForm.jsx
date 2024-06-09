// src/components/TodoForm.jsx
import { useState, useEffect } from 'react';
import { useTodos } from '../todoContext.jsx';

const TodoForm = () => {

  const { handleAddTodo, handleEditTodo, todoToEdit } = useTodos();
  //Coba Context todo

  const { cobaVariable } = useTodos();

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
      await handleEditTodo({ ...todoToEdit, text });
    } else {
      await handleAddTodo({
        id: Date.now(),
        text,
        completed: false,
      });
    }
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {cobaVariable} <p />
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