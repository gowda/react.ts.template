import React, { useState } from 'react';
import {
  useDeleteTodoMutation,
  useTodos,
  useUpdateTodoMutation,
} from '../queries';

import ListItem from '../list-item';
import { Filter } from '../filter';

interface Props {
  filter: Filter;
}

export default ({ filter }: Props) => {
  const { isLoading, isError, isSuccess, data: todos } = useTodos(filter);
  const [editing, setEditing] = useState<string>();
  const { mutateAsync: updateTodo } = useUpdateTodoMutation();
  const { mutateAsync: deleteTodo } = useDeleteTodoMutation();

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Errored</div>}
      {isSuccess && (
        <ul className='todo-list'>
          {todos &&
            todos.map((todo) => (
              <ListItem
                key={todo.id}
                editing={editing === todo.id}
                {...todo}
                onEdit={() => setEditing(todo.id)}
                onDismiss={() => setEditing(undefined)}
                onUpdate={(attrs) => updateTodo({ id: todo.id, ...attrs })}
                onDelete={() => deleteTodo(todo.id)}
              />
            ))}
        </ul>
      )}
    </>
  );
};
