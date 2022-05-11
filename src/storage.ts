import { Filter } from './filter';
import { Todo } from './todo';

const TODOS_KEY = 'react.ts.template-todos';

const get = (key: string, defaultValue: any = []): any => {
  const objString = localStorage.getItem(key);
  return (objString && JSON.parse(objString)) || defaultValue;
};

const set = (key: string, obj: any) => {
  localStorage.setItem(key, JSON.stringify(obj));
};

const getStoredTodos = () => get(TODOS_KEY) as Todo[];
const setStoredTodos = (todos: Todo[]) => set(TODOS_KEY, todos);

const uuid = (): string => {
  const now = new Date();
  return now.getTime().toString(16).padStart(32, '0');
};

export const getAllTodos = (filter: Filter = 'all'): Promise<Todo[]> => {
  const todos = getStoredTodos().filter(({ completed }) => {
    if (filter === 'active') {
      return !completed;
    }

    if (filter === 'completed') {
      return completed;
    }

    return true;
  });

  return Promise.resolve(todos);
};

export const getActiveTodoCount = (): Promise<number> => {
  const todos = getStoredTodos().filter(({ completed }) => !completed);

  return Promise.resolve(todos.length);
};

export const getAllTodoCount = (): Promise<number> =>
  Promise.resolve(getStoredTodos().length);

export const getTodo = (id: string): Promise<Todo> => {
  const todo = getStoredTodos().find(({ id: todoId }) => id === todoId);

  if (todo) {
    return Promise.resolve(todo);
  }

  return Promise.reject(new Error(`Todo not found with id ${id}`));
};

export const createTodo = (title: string): Promise<Todo> => {
  const todos = getStoredTodos();
  const todo = { id: uuid(), title, completed: false };
  setStoredTodos([...todos, todo]);

  return Promise.resolve(todo);
};

export const updateTodo = (id: string, attrs: Partial<Todo>): Promise<Todo> => {
  setStoredTodos([
    ...getStoredTodos().map(({ id: todoId, ...todoAttrs }) => {
      if (id === todoId) {
        return {
          id: todoId,
          ...todoAttrs,
          ...attrs,
        };
      }

      return { id: todoId, ...todoAttrs };
    }),
  ]);

  return getTodo(id);
};

export const deleteTodo = (id: string): Promise<void> => {
  setStoredTodos([
    ...getStoredTodos().filter(({ id: todoId }) => todoId !== id),
  ]);

  return Promise.resolve();
};

export const clearCompletedTodos = (): Promise<void> => {
  setStoredTodos([...getStoredTodos().filter(({ completed }) => !completed)]);

  return Promise.resolve();
};

export const toggleAllTodos = (): Promise<void> => {
  const todos = getStoredTodos();
  let completedState = true;
  if (todos.every(({ completed }) => completed)) {
    completedState = false;
  }

  setStoredTodos([
    ...todos.map(({ completed: _completed, ...rest }) => ({
      ...rest,
      completed: completedState,
    })),
  ]);

  return Promise.resolve();
};
