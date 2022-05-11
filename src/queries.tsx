import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Filter } from './filter';
import {
  clearCompletedTodos,
  createTodo,
  deleteTodo,
  getActiveTodoCount,
  getAllTodoCount,
  getAllTodos,
  toggleAllTodos,
  updateTodo,
} from './storage';
import { Todo } from './todo';

export const useTodos = (filter: Filter) =>
  useQuery(['todos', filter], () => getAllTodos(filter), { enabled: !!filter });

export const useCreateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation((title: string) =>
    createTodo(title).then((todo) => {
      queryClient.invalidateQueries('todos');
      queryClient.invalidateQueries('active-count');
      queryClient.invalidateQueries('all-count');

      return todo;
    })
  );
};

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, ...attrs }: Partial<Todo>) =>
    updateTodo(id!, attrs).then((todo) => {
      queryClient.invalidateQueries('todos');
      queryClient.invalidateQueries('active-count');

      return todo;
    })
  );
};

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation((id: string) =>
    deleteTodo(id).then(() => {
      queryClient.invalidateQueries('todos');
      queryClient.invalidateQueries('active-count');
      queryClient.invalidateQueries('all-count');
    })
  );
};

export const useAllCount = () => useQuery('all-count', () => getAllTodoCount());

export const useActiveCount = () =>
  useQuery('active-count', () => getActiveTodoCount());

export const useClearCompletedMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(() =>
    clearCompletedTodos().then(() => {
      queryClient.invalidateQueries('todos');
      queryClient.invalidateQueries('active-count');
    })
  );
};

export const useToggleAllCompletedMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(() =>
    toggleAllTodos().then(() => {
      queryClient.invalidateQueries('todos');
      queryClient.invalidateQueries('active-count');

      return Promise.resolve();
    })
  );
};
