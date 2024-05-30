// src/components/TodoForm.jsx
const TodoForm = () => {

  return (
    <form >
      <input
        type="text"
        placeholder="Add a new todo"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default TodoForm;
