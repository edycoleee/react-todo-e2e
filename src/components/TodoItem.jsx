// src/components/TodoItem.jsx
import { useTodos } from "../todoContext";

const TodoItem = ({ todo }) => {
  const { handleToggleComplete, handleDelete, setTodoToEdit } = useTodos();
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => handleToggleComplete(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={() => setTodoToEdit(todo)}>Edit</button>
      <button onClick={() => handleDelete(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoItem;