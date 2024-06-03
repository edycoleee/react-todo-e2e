let todos = [];

export const getTodos = () => {
  console.log("GET TODO", todos);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...todos]);
    }, 100);
  });
};

export const addTodo = (todo) => {
  console.log("ADD TODO");
  return new Promise((resolve) => {
    setTimeout(() => {
      todos.push(todo);
      resolve();
    }, 100);
  });
};

export const updateTodo = (updatedTodo) => {
  console.log("UPDATE TODO");
  return new Promise((resolve) => {
    setTimeout(() => {
      todos = todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);
      resolve();
    }, 100);
  });
};

export const deleteTodo = (id) => {
  console.log("DELETE TODO");
  return new Promise((resolve) => {
    setTimeout(() => {
      todos = todos.filter(todo => todo.id !== id);
      resolve();
    }, 100);
  });
};
