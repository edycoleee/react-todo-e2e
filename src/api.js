//src/api.js
let todos = [];

//1. fungsi simulasi get todo
export const getTodos = () => {
  console.log("GET TODO", todos);
  return new Promise((resolve) => {
    setTimeout(() => {
      //return semua data todos
      resolve([...todos]);
    }, 100);
  });
};

//2. fungsi simulasi add todo
export const addTodo = (todo) => {
  console.log("ADD TODO");
  return new Promise((resolve) => {
    setTimeout(() => {
      //add todo ke object todos
      todos.push(todo);
      resolve();
    }, 100);
  });
};

//4. fungsi simulasi update todo
export const updateTodo = (updatedTodo) => {
  console.log("UPDATE TODO");
  return new Promise((resolve) => {
    setTimeout(() => {
      todos = todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);
      resolve();
    }, 100);
  });
};

//3. fungsi simulasi delete todo
export const deleteTodo = (id) => {
  console.log("DELETE TODO");
  return new Promise((resolve) => {
    setTimeout(() => {
      todos = todos.filter(todo => todo.id !== id);
      resolve();
    }, 100);
  });
};
