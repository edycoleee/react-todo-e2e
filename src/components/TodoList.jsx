// src/components/TodoList.jsx
import TodoItem from './TodoItem';

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

export default TodoList;
