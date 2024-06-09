// src/App.jsx
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';
import { TodoProvider } from './todoContext.jsx';


const App = () => {


  return (
    <TodoProvider>
      <div>
        {/* 1. TODO HEADER */}
        <h1>Todo App</h1>
        {/* 2. TODO FORM */}
        <TodoForm />
        {/* 3. TODO LIST */}
        <TodoList />
      </div>
    </TodoProvider>
  );
};

export default App;

