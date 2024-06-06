## REACT TODO VITE - PLAYWRIGHT E2E TEST

1. Buat Folder dan install depedencies

```
npm create vite@latest todo-app --template react
cd todo-app
npm install
npm install axios
npm install --save-dev @playwright/test

```

2. Buat File seperti dibawah

```
src/
  ├── components/
  │   ├── TodoForm.jsx
  │   ├── TodoItem.jsx
  │   └── TodoList.jsx
  ├── App.jsx
  ├── main.jsx
  └── api.js
```

3. Buat file di folder root playwright.config.ts

```
//playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
```

4. edit package.json

```
// package.json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "playwright test",
    "test:e2e": "playwright test"
```

Untuk jalankan Test nanti
`npm run test:e2e`

5. Uploud di Github

```
echo "# react-todo-e2e" >> README.md
git init
git add .
git commit -m "first commit"
git branch -M main
//git remote add origin https://github.com/edycoleee/react-todo-e2e.git
//git remote remove origin
git remote add origin github.com-edycole:edycoleee/react-todo-e2e.git
git push -u origin main
```

6. Buat File TodoForm.jsx

7. Buat File TodoItem.jsx

8. Buat File TodoList.jsx

9. Buat File api.js

10. Edit File App.jsx

11. Jalankan react `npm run dev` >> coba aplikasi

12. Buat unit test di folter test >> todo.spect.ts

13. Jalankan test E2E di `npm run test:e2e`


template 

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
