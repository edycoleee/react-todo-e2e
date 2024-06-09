// src/TodoList.jsx

import { useTodos } from "../todoContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { todos } = useTodos();
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;